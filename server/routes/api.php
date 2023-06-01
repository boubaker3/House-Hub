<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\OrderContoller;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertiesController;
use App\Http\Controllers\PropertyReviewController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\SavesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/contactus', [ContactUsController::class, 'store']);

Route::group(['middleware' => 'check.token'], function () {


    Route::get('/showSellers', [SellerController::class, 'show']);
    Route::get('/deleteSeller', [SellerController::class, 'delete']);
    Route::post('/acceptSeller', [SellerController::class, 'acceptSeller']);
    Route::post('/refuseSeller', [SellerController::class, 'refuseSeller']);

    Route::get('/showClients', [ClientController::class, 'show']);
    Route::get('/deleteClient', [ClientController::class, 'delete']);


    Route::get('/showMsgs', [ChatController::class, 'show']);
    Route::get('/showMessagedUsers', [ChatController::class, 'showMessagedUsers']);
    Route::post('/storeMsgs', [ChatController::class, 'store']);
    Route::post('/updateStatus', [ChatController::class, 'update']);

    Route::get('/showOrders', [OrderContoller::class, 'show']);
    Route::post('/storeOrder', [OrderContoller::class, 'store']);
    Route::post('/updateOrder', [OrderContoller::class, 'update']);
    Route::post('/deleteOrder', [OrderContoller::class, 'delete']);

    Route::post('/storeSave', [SavesController::class, 'store']);
    Route::get('/showSaves', [SavesController::class, 'show']);


    Route::get('/showProperties', [PropertiesController::class, 'show']);
    Route::post('/storeProperty', [PropertiesController::class, 'store']);
    Route::get('/deleteProperty', [PropertiesController::class, 'delete']);
    Route::get('/showPropertyDetails', [PropertiesController::class, 'showPropertyDetails']);

    Route::get('/showReviews', [ReviewController::class, 'show']);
    Route::post('/storeReviews', [ReviewController::class, 'store']);
    Route::get('/reviewsAsNotifs', [ReviewController::class, 'reviewsAsNotifs']);

    Route::get('/showPropertyReviews', [PropertyReviewController::class, 'show']);
    Route::post('/storePropertyReviews', [PropertyReviewController::class, 'store']);
    Route::get('/checkPropertyReviews', [PropertyReviewController::class, 'check']);

    Route::get('/getUserdata', [ProfileController::class, 'show']);
    Route::post('/updateUser', [AuthController::class, 'updateUser']);
    Route::post('/updatePhoto', [ProfileController::class, 'updatePhoto']);


    Route::get('/logout', [AuthController::class, 'logout']);
});
