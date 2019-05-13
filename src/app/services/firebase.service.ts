import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getHotels(){
    return this.db.collection(`hotels`).snapshotChanges();
  }

  getHotel(userKey){
    return this.db.collection(`hotels`).doc(userKey).snapshotChanges();
  }
  getReview(){
    return this.db.collection(`reviews`).snapshotChanges();
  }
  getReviews(userKey){
    return this.db.collection(`reviews`,ref => ref.where('hid', '>=', userKey)
    .where('hid', '<=', userKey + '\uf8ff'))
    .snapshotChanges();
  }

  getOrders(userKey){
    return this.db.collection(`orders`,ref => ref.where('uid', '>=', userKey)
    .where('uid', '<=', userKey + '\uf8ff'))
    .snapshotChanges();
  }

  createReview(value) {
    return this.db.collection(`reviews`).add({
      title: value.title,
      content: value.content,
      hid: value.hid,
      created_at: value.created_at,
      user: value.user
    });
  }

  createOrder(value) {
    var end = new Date(value.time);
    end.setDate(end.getDate() + value.day)
    return this.db.collection(`orders`).add({
      uid: value.uid,
      hotel: value.hotel,
      start: new Date(value.time),
      end: end,
      room: value.room
    });
  }

  searchPlaces(start){
    return this.db.collection('hotels', ref => ref.orderBy("email")).snapshotChanges();
  }
  searchPlaceFilter(places, price){
    return this.db.collection('hotels', ref => ref.where("place","==",places).where("price","==",price)).snapshotChanges();
  }
  updateUser(userKey, value){    
    return this.db.collection('users').doc(userKey).update(value);
  }
}