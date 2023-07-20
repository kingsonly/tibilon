<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Forgotpassword extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
     public function __construct($data)
     {
         $this->data = $data;
     }


    /**
     * Build the message.
     *
     * @return $this
     */
     public function build()
     {
        return $this->from('tibilon@gmail.com',  'Tibilon')->subject("Password Creation Link")->view('emails.forgotpassword')->with('data', $this->data);
     }
}
