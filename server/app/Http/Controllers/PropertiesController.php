<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertiesController extends Controller
{

    public function createid()
    {

        $id = "";
        for ($i = 0; $i <= rand(4, 19); $i++) {
            $id .= rand(0, 9);
        }

        return $id;
    }

    public function store(Request $request)
    {
        $image = "";
        if ($request->has("image")) {
            $file = $request->file('image');
            $imagename = uniqid() . $file->getClientOriginalName();
            $file->move(public_path("images"), $imagename);
            $image = $imagename;
        }
        Property::create([
            'property_id' =>  $this->createid(),
            'property_seller_id' =>  $request->property_seller_id,
            'title' =>  $request->title,
            'propertytype' => $request->propertytype,
            'actiontype' => $request->actiontype,
            'price' => $request->price,
            'city' => $request->city,
            'image' => $image,
            'area' => $request->area,
            'bedrooms' => $request->bedrooms,
            'address' => $request->address
        ]);

        return response()->json(['res' => "your property was created successfully"]);
    }


    public function show(Request $request)
    {
        $query = Property::query();

        if ($request->has('seller_id') && $request->seller_id !== "null") {
            $query->where('property_seller_id', $request->seller_id);
        }

        if ($request->has('actiontype') && $request->actiontype !== "null") {
            $query->where('actiontype', $request->actiontype);
        }
        if ($request->has('propertytype') && $request->propertytype !== "null") {
            $query->where('propertytype', $request->propertytype);
        }

        if ($request->has('bedrooms')  && $request->bedrooms !== "null") {
            $query->where('bedrooms', $request->bedrooms);
        }

        if ($request->has('area')  && $request->area !== "null") {
            $query->where('area', $request->area);
        }
        if ($request->has('city')  && $request->city !== "null") {
            $query->where('city', $request->city);
        }

        if ($request->has('customSearch')  && $request->customSearch !== "null") {
            $query->where(function ($query) use ($request) {
                $query->where('title', 'LIKE', '%' . $request->customSearch . '%')
                    ->orWhere('city', 'LIKE', '%' . $request->customSearch . '%');
            });
        }

        $properties = $query->join('users', 'users.userid', '=', "properties.property_seller_id")
            ->orderBy("properties.rating", $request->orderBy);
        return response()->json($properties->get());
    }


    public function delete(Request $request)
    {
        $property = new Property();
        $property->where("property_id", $request->property_id)->first()->delete();
        return response()->json(['res' => 'the property was deleted successfully']);
    }


    public function showPropertyDetails(Request $request)
    {
        $property = Property::where("property_id", $request->property_id)->first();
        return response()->json(['property' => $property]);
    }
}
