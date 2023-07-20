<?php

namespace App\Http\Controllers\Api;

use App\Models\Contractor;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Property;
use App\Models\PropertyPayment;
use App\Models\PropertySalesAgent;
use App\Models\WorkOrder;
use Illuminate\Support\Facades\DB;

/**
 * @group dashboard management
 *
 * APIs for managing basic dashboard requirments 
 */

class DashboardController extends Controller
{
    /**
 * Retrieve various statistics and data for the dashboard.
 *
 * @response {
 *    "status": "success",
 *    "data": {
 *        "totalProjects": 10,
 *        "totalCompletedProject": 5,
 *        "totalInprogressProject": 5,
 *        "totalPropertyPayment": 20,
 *        "totalCompletedPropertyPayment": 15,
 *        "totalIncompletedPropertyPayment": 5,
 *        "totalProperty": 20,
 *        "totalContractors": 8,
 *        "totalInhouseContractor": 4,
 *        "totalExternalContractor": 4,
 *        "totalSoldProperty": 15,
 *        "totalAvailableProperty": 5,
 *        "affiliate": {
 *            "January": 5,
 *            "February": 8,
 *            ...
 *        },
 *        "SalesTeam": {
 *            "January": 10,
 *            "February": 12,
 *            ...
 *        },
 *        "task": [
 *            {
 *                "id": 1,
 *                "title": "Task 1",
 *                "description": "Lorem ipsum dolor sit amet.",
 *                ...
 *            },
 *            ...
 *        ]
 *    }
 * }
 */
    public function index()
    {
        // Project Statistics 
        $getProject = Project::all()->count();
        $getCompletedProject = Project::where(["status" => Project::Completed])->count();
        $getInprogressProject = Project::where(["status" => Project::Inprogress])->count();

        // Propersty payment statistics
        $getPropertyPayment = PropertyPayment::all()->count();
        $getCompletedPropertyPayment = Property::where(["status" => Property::Completed])->count();
        $getIncompletedPropertyPayment = Property::where(["status" => Property::IncompletedPayment])->count();

        // property statistics
        $getProperty = Property::all()->count();
        $getSoldPropertyBasedOnPayment = PropertyPayment::distinct('property_id')->count();
        $totalAvailableProperty = $getProperty -  $getSoldPropertyBasedOnPayment;

        // contractors 
        $getTotalContractors = Contractor::all()->count();
        $getTotalInhouseContractor = Contractor::where(["type" => Contractor::InHouse])->count();
        $getTotalExternalContractor = Contractor::where(["type" => Contractor::External])->count();

        // sales report based on affiliate and tibilon sales team
        $agentAffiliate = [];
        $agentSalesTeam = [];
        $year = date("Y");
        $allMonths = array(
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        );

        // Loop through all 12 months
        for ($month = 1; $month <= 12; $month++) {
            // Count the number of agents for the current month
            $totalAgentsAffiliate = PropertySalesAgent::whereYear('created_at', $year)
                ->whereMonth('created_at', $month)->where(["agent_type" => PropertySalesAgent::Affiliate])
                ->count();
            $agentAffiliate[$allMonths[$month - 1]] = $totalAgentsAffiliate;
        }

        for ($month = 1; $month <= 12; $month++) {
            // Count the number of agents for the current month
            $totalAgentsSalesTeam = PropertySalesAgent::whereYear('created_at', $year)
                ->whereMonth('created_at', $month)->where(["agent_type" => PropertySalesAgent::SalesTeam])
                ->count();
            $agentSalesTeam[$allMonths[$month - 1]] = $totalAgentsSalesTeam;
        }

        // fetch task for each user .
        $user_id = $loggedinuser = $userAuth = auth()->guard('sanctum')->user()->id; // Replace with the user ID for whom you want to fetch work orders

        $workOrders = WorkOrder::whereHas('assignees', function ($query) use ($user_id) {
            $query->where('assignees_id', $user_id);
        })
            ->where('work_stage_id', WorkOrder::Pending)
            ->orderBy('id', 'DESC')
            ->get();
        

        $data = [
            "totalProjects" =>  $getProject,
            "totalCompletedProject" => $getCompletedProject,
            "totalInprogressProject" => $getInprogressProject,
            "totalPropertyPayment" => $getPropertyPayment,
            "totalCompletedPropertyPayment" => $getCompletedPropertyPayment,
            "totalIncompletedPropertyPayment" => $getIncompletedPropertyPayment,
            "totalProperty" => $getProperty,
            "totalContractors" => $getTotalContractors,
            "totalInhouseContractor" => $getTotalInhouseContractor,
            "totalExternalContractor" => $getTotalExternalContractor,
            "totalSoldProperty" => $getSoldPropertyBasedOnPayment,
            "totalAvailableProperty" => $totalAvailableProperty,
            "affiliate" => $agentAffiliate,
            "SalesTeam" => $agentSalesTeam,
            "task" => $workOrders,
        ];
        return response()->json(["status" => "success", "data" => $data], 200);
    }
}
