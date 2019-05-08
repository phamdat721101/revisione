import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

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

  getReviews(userKey){
    return this.db.collection(`reviews`,ref => ref.where('hid', '>=', userKey)
    .where('hid', '<=', userKey + '\uf8ff'))
    .snapshotChanges();
  }

  createReview(value) {
    return this.db.collection(`reviews`).add({
      title: value.title,
      content: value.content
    });
  }

  createOrder(value) {
    var end = new Date(value.time);
    end.setDate(end.getDate() + value.day)
    return this.db.collection(`orders`).add({
      uid: value.uid,
      hid: value.hid,
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
//   updateUser(userKey, value){
//     value.nameToSearch = value.name.toLowerCase();
//     return this.db.collection('users').doc(userKey).set(value);
//   }

//   deleteUser(userKey){
//     return this.db.collection('users').doc(userKey).delete();
//   }

//   getUsers(){
//     return this.db.collection('users').snapshotChanges();
//   }

//   searchUsers(searchValue){
//     return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
//       .where('nameToSearch', '<=', searchValue + '\uf8ff'))
//       .snapshotChanges()
//   }

//   searchUsersByAge(value){
//     return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
//   }
}