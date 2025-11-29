<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SetsComponentsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sets_of_dishes_id' => ['required', 'integer'],
            'dishes_id' => ['required', 'integer'],
            'quantity' => ['required', 'integer', 'min:1'],
        ];
    }
}

