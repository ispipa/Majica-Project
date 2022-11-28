<?php

namespace App\Http\Requests\JsonApiAuth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'telephone' => 'required|numeric',
            'address' => 'required|string',
            'artist' => 'required|string',
            'type_of_art' => 'required|string',
            'description_user' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}
