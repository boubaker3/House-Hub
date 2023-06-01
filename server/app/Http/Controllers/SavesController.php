<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Save;
use Illuminate\Http\Request;

class SavesController extends Controller
{
    public function store(Request $request)
    {
        $saves = Save::where("client_id", $request->client_id)
            ->where("property_id", $request->property_id)->first();
        if (empty($saves)) {
            Save::create([
                'property_id' => $request->property_id,
                'client_id' => $request->client_id
            ]);
            return response()->json(['res' => 'your property was saved successfully ']);
        } else {
            return response()->json(['res' => 'your property was already saved ! ']);
        }
    }

    public function show(Request $request)
    {
        $saves = Save::where("client_id", $request->client_id)
            ->join('properties', 'properties.property_id', 'saves.property_id')
            ->join('users', 'users.userid', 'properties.property_seller_id')
            ->get();
        return response()->json(['saves' => $saves]);
    }
}
