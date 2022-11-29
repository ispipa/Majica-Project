<?php

namespace App\Http\Controllers;

use App\Models\Salas;
use Illuminate\Http\Request;

class SalasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $salas = Salas::all();
        return $salas;
    }


    public function bought(Request $request)
    {
        $sala = Salas::join('pagos','salas.id', '=', 'pagos.sala_pagos')
                    ->where("usuario", $request->id )
                    ->where("pagado", "true" )
                    ->select('salas.*','pagos.*')
                    ->get();

        return $sala;

    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $sala =  new Salas();
        $sala->nombre_sala = $request->nombre_sala;
        $sala->descripcion_sala = $request->descripcion_sala;
        $sala->precio_sala = $request->precio_sala;
        $sala->activo = $request->activo;
        $sala->piso = $request->piso;
        $sala->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $sala = Salas::find($id);
      
        return $sala;
        
       
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $sala = Salas::findOrfail($request->id);
        $sala->nombre_sala = $request->nombre_sala;
        $sala->descripcion_sala = $request->descripcion_sala;
        $sala->precio_sala = $request->precio_sala;
        $sala->activo = $request->activo;
        $sala->save();
    }

    public function updateEstado(Request $request)
    {
        $sala = Salas::findOrfail($request->id);
        $sala->activo = $request->activo;
        $sala->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $sala =  Salas::destroy($id);
        return $sala;
    }
}
