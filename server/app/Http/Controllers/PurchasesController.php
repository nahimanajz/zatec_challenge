<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchases;
use App\Models\User;
use Illuminate\Http\Request;

class PurchasesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        $purchases =  Purchases::select("*")->where("user_id", "=", $userId)->get();
        return response()->json(["purchases" => $purchases]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $userId, $productId)
    {
        // find product, calculate reducation, deduct money from topup and save into db,
        $product = Product::find($productId);
        $price = (int) $product->price;
        $paidAmount = $this->discountPercentate($price);
        $purchase = Purchases::create(["user_id" => $userId, "product_id" => $productId, "paidAmount" => $paidAmount]);
        $updateToppedUp = User::updateBalance($paidAmount, $userId, "deduct");
        $this->sendEmail($userId);
        return response()->json(["message" => "New purchase is saved", "Purchanse" => $purchase]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Purchases  $purchases
     * @return \Illuminate\Http\Response
     */
    public function show(Purchases $purchases)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Purchases  $purchases
     * @return \Illuminate\Http\Response
     */
    public function edit(Purchases $purchases)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Purchases  $purchases
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Purchases $purchases)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Purchases  $purchases
     * @return \Illuminate\Http\Response
     */
    public function destroy(Purchases $purchases)
    {
        //
    }
    /**
     * @param product price from products table
     * Calculate percentage
     * dedect percentage and return amount to pay
     * @return amount to pay on product
     */
    private function discountPercentate($price)
    {


        if ($price == 50 || $price <= 100) {
            $percentage = 0;
        } else if ($price == 50 || $price <= 115) {
            $percentage = 0.25;
        } else if ($price > 120) {
            $percentage = 0.5;
        }
        return $percentage == 0 ? $price : $price - ($percentage * 100 / $price);
    }

    private function sendEmail($clientId)
    {

        $to = env('ADMIN_EMAIL');
        $from = User::find($clientId)->email; // this is the sender's Email address
        $subject = "Order is placed";
        $message = 'Hi Seller' . $from . 'Placed an order';

        $headers = "From:" . $from;
        return mail($to, $subject, $message, $headers);
    }
}
