<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Property;
use Illuminate\Http\Request;

class OrderContoller extends Controller
{
    public function store(Request $request)
    {
        $res = Order::where("sender_id", $request->sender_id)->where("receiver_id", $request->receiver_id)
            ->where("property_id", $request->property_id)->first();
        if (empty($res)) {
            Order::create([
                'sender_id' =>  $request->sender_id,
                'receiver_id' => $request->receiver_id,
                'property_id' => $request->property_id
            ]);
        }

        return response()->json(['res' => "your order was sent successfully"]);
    }
    public function show(Request $request)
    {
        $query = Order::query();

        if ($request->has('seller_id') && $request->seller_id !== "null") {
            $query->where('receiver_id', $request->seller_id);
        }
        if ($request->has('client_id') && $request->client_id !== "null") {
            $query->where('sender_id', $request->client_id);
        }

        $orders = $query->join('users', function ($join) {
            $join->on('users.userid', '=', 'orders.sender_id')
                ->orWhere('users.userid', '=', 'orders.receiver_id');
        })
            ->join('properties', 'properties.property_id', '=', 'orders.property_id')
            ->select("properties.title", "users.*", "orders.id as order_id", 'orders.*');

        return response()->json($orders->get());
    }

    public function update(Request $request)
    {

        $order = new Order();
        $order->where("id", $request->order_id)
            ->update(['accepted' => $request->status]);
        $property_id = $order->where("id", $request->order_id)->value('property_id');
        Property::where("property_id", $property_id)
            ->update(['isactive' => $request->status]);
        return response()->json(["res" => "your order is updated now"]);
    }

    public function delete(Request $request)
    {

        $order = new Order();
        $order->where("id", $request->order_id)
            ->delete();
        return response()->json(["res" => "your order is deleted now"]);
    }
}
