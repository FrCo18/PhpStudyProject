<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    private string $mail;
    private string $token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $mail, string $token)
    {
        $this->mail = $mail;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('ResetPassword')->with([
            'email' => $this->mail,
            'token' => $this->token
        ]);
    }
}
