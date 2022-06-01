<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Signin;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use ApiResponser;

    public function register(SignupRequest $req)
    {
        $validated = $req->validated();
        $data = array_merge($validated, ["password" => bcrypt($req->password)]);

        $user = User::create($data);
        return response()->json([
            "message" => "User registered successfully",
            "user"=>$user,
        ],
            201);
       
    }
    public function login(Signin $req) {
        $credentials = $req->validated();
        if(!Auth::attempt($credentials)){
            return json_encode(['error'=>true, 'message' => 'Invalid Email or Password'], 401);
        }           
        return response()->json([
            'error'=>false,
            'user' => Auth::user(),
            'token' => $this->signToken($req, 'zateckey')
           
        ]);      
       
  } 
    public function logout(Request $req) {       
        if ($req->user()) { 
            $req->user()->tokens()->delete();
        }
        return [
            'message' => 'Tokens Revoked'
        ];
    }
    private function signToken(Request $req, $key) {       
        return $req->user()->createToken($key)->plainTextToken; 
       }
}
