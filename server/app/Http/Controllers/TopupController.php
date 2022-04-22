<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTopupRequest;
use App\Http\Requests\UpdateTopupRequest;
use App\Models\Topup;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class TopupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        return response()->json(["topups" =>  Topup::select("*")->where("user_id", "=", $userId)->get()]);
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
     * @param  \App\Http\Requests\StoreTopupRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        //tdodo insert topup, and update user balance later on adding new column to keep balance of user 
    $data = request()->all();
    $save = Topup::create(['amount'=>$data['amount'], 'currency'=>$data['currency'], "user_id" => $data['user_id']]);
    if($save) {
        $updateBalance = User::updateBalance($data['amount'], $data['user_id'],"add");
        return response()->json(['message' => 'topup created successfully','topup' => $save, "balance" => $updateBalance]);

        } else {
            return response()->json(array('error' => 'Failed to save'));

    }
         
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Topup  $topup
     * @return \Illuminate\Http\Response
     */
    public function show(Topup $topup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Topup  $topup
     * @return \Illuminate\Http\Response
     */
    public function edit(Topup $topup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTopupRequest  $request
     * @param  \App\Models\Topup  $topup
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTopupRequest $request, Topup $topup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Topup  $topup
     * @return \Illuminate\Http\Response
     */
    public function destroy(Topup $topup)
    {
        //
    }
}
