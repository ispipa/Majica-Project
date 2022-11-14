<?php

namespace App\Http\Controllers;

use App\Models\Pagos;
use Illuminate\Http\Request;

class PagosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $aPagar = Pagos::where('usuario', $request->usuario)->get();
        return $aPagar;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pago = new Pagos();
        $pago->precio_pagos = $request->precio;
        $pago->sala_pagos = $request->sala;
        $pago->piso_pagos = $request->piso;
        $pago->usuario = $request->usuario;
        $pago->pagado = $request->pagado;
        $pago->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $pago = Pagos::find($id);
        return $pago;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $pago = Pagos::findOrFail($id);
        $pago->precio_pagos = $request->precio;
        $pago->pagado = $request->pagado;
        $pago->save();
        // return $pago;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pago = Pagos::where("sala_pagos", $id)->delete();
        return $pago;
    }
}
