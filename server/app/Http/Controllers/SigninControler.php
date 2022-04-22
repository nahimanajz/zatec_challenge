<?php

namespace App\Http\Controllers;

use App\Http\Requests\Signin;
use Illuminate\Http\Request;
use App\Models\User;

class SigninControler extends Controller
{
    public function login(Signin $req){

        $validated = $req->validated();
        
        //todo: check password after
        $user = User::all();

        return response()->json(array($user));
        
    }
    public function index() { 
        return json_encode("hellow");
    }
}
