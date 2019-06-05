import { Injectable } from '@angular/core';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';

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

  createHotel(value) {
    return this.db.collection(`hotels`).add({
      name: value.name,
      email: value.email,
      phone: value.phone,
      place: value.place,
      address: value.address,
      price: value.price,
      description: value.description,
      image:"https://firebasestorage.googleapis.com/v0/b/revisione-ea22e.appspot.com/o/feature-3.jpg?alt=media&token=97e5b36f-1fbb-4c20-a527-8cf77bc4d129"
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
      room: value.room,
      cost: value.cost*value.dat
    });
  }

  searchPlaces(start,end){
    return this.db.collection('hotels', ref => ref.orderBy("name").limit(2).startAt(start).endAt(end)).snapshotChanges();
  }
  searchPlaceFilter(places, price){
    return this.db.collection('hotels', ref => ref.where("place","==",places).where("price","==",price)).snapshotChanges();
  }
  updateUser(userKey, value){    
    return this.db.collection('users').doc(userKey).update(value);
  }
  // getUser(){
  //   return this.db.collection('users').doc(userKey).snapshotChanges();
  // }
}
