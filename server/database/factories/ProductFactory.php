<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $prices = [1000, 2000, 3000, 2000,21000];
        $discount = [100, 230, 32, 91,12];
        $names = ["furniture", "table"];
        return [
            'name' => $names[rand(0, 1)],
            'price' => $prices[rand(0, 4)],
            'discount' => $discount[rand(0, 4)],
           'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
           'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),

        ];
    }
}
