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
    public function update(Request $request, $id)
    {
        $sala = Salas::findOrfail($request->id);
        $sala->nombre_sala = $request->nombre_sala;
        $sala->descripcion_sala = $request->descripcion_sala;
        $sala->precio_sala = $request->precio_sala;
        $sala->activo = $request->activo;
        $sala->piso = $request->piso;
        return $sala;
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
