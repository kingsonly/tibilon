<?php

namespace App\Http\Controllers\Api;

use NumberToWords\NumberToWords;
use App\Http\Resources\AffiliateShow;
use App\Http\Resources\ClientResource;
use App\Models\Property;
use App\Models\Amenities;
use Illuminate\Http\Request;
use App\Models\PropertyAmenities;
use App\Http\Resources\PropertyList;
use App\Http\Resources\PropertyPayment as ResourcesPropertyPayment;
use App\Http\Resources\PropertyShow;
use App\Http\Resources\PropertyStat;
use App\Http\Resources\StatsNotAvailabel;
use App\Http\Resources\UsersResource;
use App\Models\AgentCommission;
use App\Models\Payment;
use App\Models\PaymentFrequency;
use App\Models\PropertyClient;
use App\Models\PropertyPayment;
use App\Models\PropertySalesAgent;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Dompdf\Dompdf;
use Carbon\Carbon;
use Illuminate\Support\Str;

class PropertyController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): AnonymousResourceCollection
  {
    $validator = Validator::make($request->all(), [
      'id' => 'required',
    ]);


    if ($validator->fails()) {
      return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
    }

    $id = $request->input("id");
    $perPage = $request->input('per_page', 10);
    $page = $request->input('page', 1);
    $model = Property::with(["amenity.amenity", "project"])->where("project_id", $id)->orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);
    return PropertyList::collection($model);
  }


  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    // things to do 
    //1. do validation
    //2. fetch and create all amenities
    //3. create property

    $loggedinuser = auth()->guard('sanctum')->user();
    $validator = Validator::make($request->all(), [
      'project' => 'required',
      'name' => 'required',
      "image" => 'required',
      "description" => 'required',
      "amenities" => 'required',
      "amount" => 'required',
    ]);
    $amenities = $request->input('amenities');

    if ($validator->fails()) {
      return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
    }

    $model = new Property();
    $model->name = $request->input('name');
    $model->project_id = $request->input('project');

    //save image 
    $image = $request->file('image');
    $imageName = time() . '.' . $image->getClientOriginalExtension();
    $image->move(public_path('images/property'), $imageName);

    $model->cover_image = '/images/property/' . $imageName;;
    $model->description = $request->input('description');
    $model->log_user_id = $loggedinuser->id;
    $model->amount = $request->input('amount');
    $model->status = Property::Incompleted;

    if ($model->save()) {
      foreach (json_decode($amenities, true) as $amenity) {
        $amenityModel =  new PropertyAmenities();
        $amenityModel->property_id = $model->id;
        $amenityModel->amenity_id = $amenity["amenity"];
        $amenityModel->quantity = $amenity["quantity"];
        $amenityModel->log_user_id =  $loggedinuser->id;
        $amenityModel->status =  Property::Incompleted;
        $amenityModel->save();
      }
      return response()->json(["status" => "success"], 200);
    }
    return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled"], 400);
  }

  /**
   * Display the specified resource.
   */

  public function show(string $id)
  {

    $model = Property::with(["project", "amenity.amenity", "payments", "client.client", "agent.affiliates", "agent.users"])->find($id);
    if (!empty($model)) {
      return new PropertyList($model);
    } else {
      return response()->json(["status" => "error", "message" => "Could not find the specific property"], 400);
    }
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    $validator = Validator::make($request->all(), [
      'name' => 'required',
      "image" => 'required',
      "description" => 'required',
      //"amenities" => 'required',
    ]);

    if ($validator->fails()) {
      return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
    }

    $model = Property::find($id);
    if (!empty($model)) {
      $model->name = $request->input('name');
      $model->description = $request->input('description');
      $model->log_user_id = $model->log_user_id;
      $model->status = $model->status;
      if ($model->save()) {
        return response()->json(["status" => "success", "message" => "You have successfully updted the record"], 200);
      } else {
        return response()->json(["status" => "error", "message" => "Something went wrong please try again"], 400);
      }
    } else {
      return response()->json(["status" => "error", "message" => "There are no property at the moment with this property id"], 400);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $model = Property::find($id);
    if (!empty($model)) {
      if ($model->delete()) {
        return response()->json(["status" => "success"], 200);
      } else {
        return response()->json(["status" => "error", "message" => "Couldnot delete this record please retry after some minute"], 400);
      }
    }
    return response()->json(["status" => "error", "message" => "The requested record does not exist"], 400);
  }

  public function search(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'query' => 'required',
    ]);

    if ($validator->fails()) {
      return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
    }


    $query = $request->input('query');
    $page = $request->input('page', 1);
    $perPage = $request->input('perpage', 10);

    $property = Property::where('name', 'LIKE', "%$query%")
      ->orWhere('description', 'LIKE', "%$query%")
      ->with(["project", "amenity.amenity"])
      ->paginate($perPage, ["*"], "page", $page);

    if (!empty($property)) {
      return PropertyList::collection($property);
    } else {
      return response()->json(["status" => "error", "message" => "No record matches your search."], 400);
    }
  }

  public function viewPayment(string $id)
  {
    $model = PropertyPayment::with(["payment", "property.payments"])->orderBy('created_at', 'desc')->find($id);
    if (!empty($model)) {
      return new ResourcesPropertyPayment($model);
    }
    return response()->json(["status" => "error", "message" => "There is no payment with the above id "], 400);
  }

  public function allPayment(Request $request, string $id)
  {
    $perPage = $request->input('per_page', 10);
    $page = $request->input('page', 1);
    $model = PropertyPayment::where("property_id", $id)->with("payment")->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
    if (!empty($model)) {
      return ResourcesPropertyPayment::collection($model);
    }
    return response()->json(["status" => "error", "message" => "This property currently has no payment."], 400);
  }

  public function addPayment(Request $request)
  {

    $validator = Validator::make($request->all(), [
      'property' => 'required',
      'proofOfPayment' => 'required',
      'amount' => 'required',
      'modeOfPayment' => 'required',
    ]);

    $loggedinuser = auth()->guard('sanctum')->user();

    // check if a property has an agent and client
    //first fetch property with agent and client 
    $getProperty = Property::with(["agent", "client", "payments"])->find($request->input("property"));
    if (empty($getProperty->agent) or empty($getProperty->client)) {
      // check if post value exist to create 
      $agentClientValidator = Validator::make($request->all(), [
        'client' => 'required', //client_id
        'agent' => 'required', //agent_id
        'agentType' => 'required', //select of affiliate and employee
        'paymentFrequency' => 'required', //select of affiliate and employee
        'commision' => 'required', //commission for agent in percentage
      ]);
      if ($agentClientValidator->fails()) {
        return response()->json(["status" => "error", "message" => "please ensure client and agent values are available", "data" => $agentClientValidator], 400);
      }

      $client = $request->input("client");
      $agent = $request->input("agent");
      $createAgent =  new PropertySalesAgent();
      $paymentFrequency =  new PaymentFrequency();
      $paymentFrequency->property_id = $request->input("property");
      $paymentFrequency->frequency = $request->input("paymentFrequency");
      $paymentFrequency->log_user_id = $loggedinuser->id;
      $paymentFrequency->status = Payment::Default;
      $paymentFrequency->save();
      $createAgent->property_id = $request->input("property");
      $createAgent->agent_id = $agent;
      $createAgent->agent_type = $request->input("agentType");
      $createAgent->commission = $request->input("commision");
      $createAgent->status = PropertySalesAgent::Default;
      $createAgent->save();

      //return response()->json(["data" => $createAgent], 200);

      $createClient = new PropertyClient();
      $createClient->property_id = $request->input("property");
      $createClient->client_id = $client;
      $createClient->log_user_id = $loggedinuser->id;
      $createClient->status = PropertyClient::Default;
      $createClient->save();
    }


    if ($validator->fails()) {
      return response()->json(['status' => 'error', 'message' => "Please ensure that there is no empty requierd fields "], 400);
    }

    $propertyPaymentModel = new PropertyPayment();
    $paymentModel = new Payment();
    $paymentModel->amount = $request->input("amount");
    $paymentModel->project_id = $getProperty->project_id;
    $paymentModel->payment_type = Payment::Credit;
    $paymentModel->mode_of_payment = $request->input("modeOfPayment");
    $paymentModel->log_user_id = $loggedinuser->id;
    $paymentModel->status = Payment::Default;
    if ($paymentModel->save()) {

      // take payment id and use it to create property payment relationship
      $image = $request->file('proofOfPayment');
      $imageName = time() . '.' . $image->getClientOriginalExtension();
      $image->move(public_path('images/proofofpayment'), $imageName);

      $propertyPaymentModel->property_id = $request->input("property");;
      $propertyPaymentModel->payment_id = $paymentModel->id;
      $propertyPaymentModel->log_user_id = $loggedinuser->id;
      $propertyPaymentModel->prof_of_payment = '/images/proofofpayment/' . $imageName;
      $propertyPaymentModel->status = PropertyPayment::Default;
      if ($propertyPaymentModel->save()) {
        $getProperty = Property::with(["agent", "client", "payments"])->find($request->input("property"));
        // check if the payment is a full payment and update the property status and if its a pertial payment use the info to update too
        $totalPayment = $getProperty->payments->sum(function ($payment) {
          return $payment->amount ?? 0;
        });

        if ($totalPayment >= $getProperty->amount) {
          $getProperty->status = (int)Property::Completed;
        } else {
          $getProperty->status = (int)Property::IncompletedPayment;
        }

        if ($getProperty->save()) {
          return response()->json(["status" => "success",], 201);
        }
      }
      return response()->json(["status" => "error"], 400);
    }
    return response()->json(["status" => "error"], 400);
  }

  public function client(string $id)
  {
    $model = Property::find($id);
    if (!empty($model)) {

      return new ClientResource($model->client->client);
    }
    return response()->json(["status" => "error", "message" => "There is presently no property with the above property ID "], 400);
  }

  public function updateAmenity(Request $request, string $id)
  {
    $validator = Validator::make($request->all(), [
      //'propertyAmenity' => 'required',
      'amenity' => 'required',
      "quantity" => 'required',
    ]);

    if ($validator->fails()) {
      return response()->json(["status" => "error", "message" => "ensure that all required filed are properly filled"], 400);
    }

    $amenityModel =  PropertyAmenities::find($id);
    //$amenityModel->property_id = $amenityModel->property_id;
    $amenityModel->amenity_id = $request->input("amenity");
    $amenityModel->quantity = $request->input("quantity");
    //$amenityModel->log_user_id =  $amenityModel->log_user_id;

    if ($amenityModel->save()) {
      return response()->json(["status" => "success"], 201);
    }
    return response()->json(["status" => "error", "message" => "something went wrong please try again "], 400);
  }

  public function deleteAmenity($id)
  {
    $model = PropertyAmenities::find($id);
    if ($model->delete()) {
      return response()->json(["status" => "success"], 200);
    }
    return response()->json(["status" => "error", "message" => "sorry we could not delete this resource at this moment."], 400);
  }

  public function addAmenity(Request $request)
  {
    $loggedinuser = auth()->guard('sanctum')->user();
    $validator = Validator::make($request->all(), [
      'property' => 'required',
      'amenity' => 'required',
      "quantity" => 'required',
    ]);

    if ($validator->fails()) {
      return response()->json(["status" => "error", "message" => "ensure that all required filed are properly filled"], 400);
    }

    $amenityModel =  new PropertyAmenities();
    $amenityModel->property_id = $request->input("property");
    $amenityModel->amenity_id = $request->input("amenity");
    $amenityModel->quantity = $request->input("quantity");
    $amenityModel->log_user_id =  $loggedinuser->id;
    $amenityModel->status =  PropertyAmenities::Default;


    if ($amenityModel->save()) {
      return response()->json(["status" => "success"], 201);
    }
    return response()->json(["status" => "error", "message" => "something went wrong please try again "], 400);
  }

  public function stats($id)
  {
    $model = Property::with(["project.property", "project.propertyPayments", "project.propertySold", "project.propertyPertiallySold"])
      ->where("project_id", $id)->first();

    if ($model) {
      return new PropertyStat($model);
    } else {
      // Handle the case when the model is not found
      return new StatsNotAvailabel($model);
    }
  }

  public function agent($id)
  {
    $model = Property::find($id);
    if (!empty($model)) {
      if (!empty($model->agent)) {
        if ($model->agent->agent_type == PropertySalesAgent::Affiliate) {
          return new  AffiliateShow($model->agent->affiliates);
        } else {
          return new  UsersResource($model->agent->users);
        }
      }
      return response()->json(["status" => "error", "This user presently has no agent."], 400);
    }
    return response()->json(["status" => "error", "message" => "There is presently no property with the above property ID "], 400);
  }

  public function agentCommision(Request $request, $id)
  {
    $loggedinuser = auth()->guard('sanctum')->user();
    $paymentModel = new Payment();
    $commission = new AgentCommission();
    $propertyModel = Property::with(["agent"])->find($id)->first();
    $paymentModel->project_id = $propertyModel->project_id;
    $paymentModel->amount = $request->input("amount");
    $paymentModel->log_user_id = $loggedinuser->id;
    $paymentModel->status = Payment::Default;
    $paymentModel->mode_of_payment = $request->input("modeOfPayment");
    $paymentModel->payment_type = Payment::Debit;
    if ($paymentModel->save()) {
      $commission->property_id = $id;
      $commission->agent_id = $propertyModel->agent->agent_id;
      $commission->payment_id = $paymentModel->id;
      $commission->agent_type = $propertyModel->agent->agent_type;
      $commission->log_user_id = $loggedinuser->id;
      $commission->status = Payment::Default;
      if ($commission->save()) {
        return response()->json(["status" => "success"], 200);
      }
      return response()->json(["status" => "error", "message" => "something went wrong, please retry."], 400);
    }
    return response()->json(["status" => "error", "message" => "something went wrong, please retry."], 400);
  }

  public function paymentReceipt($id)
  {
    //reciept;
    $model = PropertyPayment::with(["payment", "property.payments"])->orderBy('created_at', 'desc')->where(["id"=>$id])->first();
    $dateOfPayment = $model->created_at;
    $client = $model->property->client->client->name;
    $address = $model->property->client->client->address->full_address;
    $propertyDescription = $model->property->description;
    $propertyPayments = $model->property->payments->sum(function ($payment) {
      return $payment->amount ?? 0;
    });
    $amount = number_format($model->payment->amount, 2, '.', ',');
    $carbonDate = Carbon::parse($dateOfPayment);
    $balance = number_format($model->property->amount - $propertyPayments, 2, '.', ',');
    // Format the date as "April, 17, 2023"
    $dateOfPayment = $carbonDate->format('F, d, Y');
    $reciept = $model->reciept;
    if (empty($model)) {
      return response()->json(['status' => "error"], 400);
    }
    if (empty($reciept)) {
      // generate reciept save it and reset it 
      $model->reciept = str_pad($model->id, 3, '0', STR_PAD_LEFT);
      $model->save();
      $reciept = $model->reciept;
    }
    $numberToWords = new NumberToWords();
    $currencyTransformer = $numberToWords->getCurrencyTransformer('en');
    $money = $model->payment->amount . "00";
    $amountInWords = ucfirst($currencyTransformer->toWords($money, 'NGN'));
    $amountInWords = str_replace("Nairas", " Naira", $amountInWords);
    $imagePath = "https://tibilon.skillzserver.com/static/media/company_logo.861e326775b7cd6e6ac78c6d380a1dde.svg";
    $pdfContent = "
        <!DOCTYPE html>
        <!-- saved from url=(0038)file:///Users/mac/Downloads/index.html -->
        <html><head><meta http-equiv='Content-Type' content='text/html; charset=windows-1252'>
            <title>Tibilion receipt-information</title>
            <style>
              body {
                margin: 0;
                width: 100vw;
                display: flex;
                align-items: center;
                justify-content: center;
              }
        
              .parent-div {
                padding: 24px;
              }
        
              .heading {
                width:100%;
                text-align:center;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 20px;
              }
        
              table,
              td {
                border: 2px solid #080808;
                border-collapse: collapse;
              }
              thead{
                background: #ccc;
              }
        
              .td-right {
                font-size: small;
                text-align: right;
              }
        
              .td-left {
                font-size: small;
                background-color: rgb(187, 138, 63);
              }
        
              .receipt-information {
                display: flex;
                margin-top: 40px;
              }
              .receipt-informationdiv {
                width:50%;
              }
        
              .client-name {
                margin-top: 8px;
              }
        
              .dotted-line {
                border-top: 1px dotted;
                margin-top: 30px;
              }
        
              .items-description td:last-child {
                white-space: nowrap;
              }
        
              .vl {
                border-left: 2px solid black;
                height: 500px;
                position: absolute;
                left: 50%;
                margin-left: -3px;
                top: 8px;
              }
              .company-logo{
                width: 100%;
                height: 100px;
                background-image: url({$imagePath})
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .vertical-line {
                border-left: 0.5px solid rgb(38, 57, 11);
                height: 100px; 
                margin: 0 auto; 
              }
              .mb-7{
                margin-bottom: 7px;
              }
              .items-description td {
                text-align: center; 
                padding-left: 5px;
              }
              .row-last{
                text-align: left !important;
              }
            </style>
          </head>
        
          <body>
            <div class='body'>
              <div class='parent-div'>
                <div class='heading'>
                <h1>Tibilon Construction Ltd</h1>
                </div>
                <div class='heading'>
                  <h2>Payment Receipt</h2>
                </div>
        
                <div style='display:flex ' class='receipt-information'>
                  <div class='receipt-informationdiv' style='font-size: 20px;float:left'><b>Sold To:</b></div>
                  <div style='float:left ' class='receipt-informationdiv'>
                  <table style='width: 100%'>
                    <tbody>
                    <tr>
                      <td class='td-left'><b>Receipt #:</b></td>
                      <td class='td-right'>{$reciept}</td>
                    </tr>
                    <tr>
                      <td class='td-left'><b>Date:</b></td>
                      <td class='td-right'>{$dateOfPayment}</td>
                    </tr>
                  </tbody></table>
                  </div>
                  
                </div>
        
                <div class='client-name' style='clear: both;'>
                  <div class='client-name'><b>{$client}</b></div>
                  <div class='client-name'>
                    {$address}
                  </div>
                </div>
                <hr class='dotted-line'>
        
                <div class='items-description'>
                  <table style='width: 98%'>
                    <thead>
                      <tr style='height: 40px; font-size: small'>
                        <td style='width: 75px'><b>Serial No:</b></td>
                        <td style='width: 400px'><b>Description</b></td>
                        <td><b>Payment Amount</b></td>
                      </tr>
                    </thead>
                    <tbody>
                    <tr style='height: 220px'>
                      <td style='height: 220px'>1</td>
                      <td style='height: 220px'>
                        {$propertyDescription}
                      </td>
                      <td style='height: 220px'>N{$amount}</td>
                    </tr>
                    <tr style='height: 100px;'>
                      <td colspan='2' class='row-last'>  
                        <div class='mb-7'><b>Amount in words:</b></div>
                        <div>{$amountInWords}</div>
                      </td>
                      <td  class='row-last' >
                        <div class='mb-7'> <b>Total Amount:</b></div>
                        <div><b>N {$amount}</b></div>         
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div style='margin-top: 30px;'>
                  <div><b>Balance: N{$balance}</b></div>
                </div>
                <div style='position: absolute;
                bottom: 40px; width:100%;'>
                <div style='width:100%;text-align:center'>
                  <h3>THANK YOU FOR WORKING WITH US !!!</h3>
                </div>
                <hr style='border-top: 0.5px solid black;'>
                <div style='display: flex; gap: 50px; margin-top: 30px;'>
                  <div style='float:left;width:33%;border-right:solid 1px green;text-align:center;height:100px'>
                    <div><b>ABUJA OFFICE:</b></div>
                    <div>No 4 Santana Close, off Aminu</div>
                    <div>Kano Crescent, Abuja, FCT, Abuja.</div>
                  </div>
                  
                  <div style='float:left;width:33%;border-right:solid 1px green;text-align:center;height:100px'><b>Phone:</b> 07031163634</div>
                  <div style='float:left;text-align:center;height:100px;width:33%'><b>Email:</b> info@tibilon.com</div>
                </div>
                </div>
              </div>
            </div>
          
        
        </body></html>
        ";

    // Initialize Dompdf

    $dompdf = new Dompdf(array('enable_remote' => true));
    $dompdf->loadHtml($pdfContent);

    // (Optional) Set paper size and orientation (e.g., A4, portrait)
    $dompdf->setPaper('A4', 'portrait');

    // Render the PDF content
    $dompdf->render();

    // Generate PDF filename (you can customize this as needed)
    $filename = 'receipt_' . $id . '.pdf';

    // Download the PDF file
    return $dompdf->stream($filename);

    $pdfFilePath = 'pdfs/' . $filename;
    file_put_contents($pdfFilePath, $dompdf->output());

    // $pdfFilePath = storage_path('app/public/pdfs/') . 'receipt_' . $id . '.pdf';
    // file_put_contents($pdfFilePath, $dompdf->output());

    return response()->json(['pdf_url' => asset('pdfs/' . 'receipt_' . $id . '.pdf')]);
  }
}
