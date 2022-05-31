<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;


class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name"=>"required",
            "balance"=> "required",
            "password"=>"required|min:6",
            "email"=>"required|email|unique:users",
            "userType"=>"required"
        ];
    }
    public function failedValidation(Validator $validator)  {
        throw new HttpResponseException(response()->json(['message' => $validator->errors()->all(),"error"=>true]));
       
    }
}
