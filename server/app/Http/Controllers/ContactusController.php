<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    public function store(Request $request)
    {
        $message = Contact::create([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'phone' => $request->phone,
            'city' => $request->city,
            'message' => $request->message
        ]);
        return response()->json(['res' => 'your message is sent successfully ' . $message->fullname]);
    }
}
