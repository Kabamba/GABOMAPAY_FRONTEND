import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  list(id) {
    return this.http.get(
      environment.apiUrl + `/admin/transactions/transac_user/${id}`
    );
  }

  listLast(id){
    return this.http.get(
      environment.apiUrl + `/admin/transactions/transac_user_last/${id}`
    );
  }

  operators(){
    return this.http.get(environment.apiUrl + `/admin/operators/list`);
  }

  detail(transac,user) {
    return this.http.get(environment.apiUrl + `/admin/transactions/transacuser/${transac}/${user}`);
  }
  
  rechargeGab(user_id, name, email, phone, amount) {
    return this.http.post(environment.apiUrl + '/paiement/recharge/gab', {
      user_id: user_id,
      name: name,
      email: email,
      phone: phone,
      amount: amount,
    });
  }

  rechargeRdc(form) {
    return this.http.post(environment.apiUrl + '/paiement/recharge/rdc', form);
  }

  retraitRDc(sender_id,amount,recever_number,operator_id) {
    return this.http.post(environment.apiUrl + '/paiement/retrait/rdc',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number,
      operator_id:operator_id
    });
  }

  TransCompteRdc(sender_id,amount,recever_number) {
    return this.http.post(environment.apiUrl + '/paiement/envoie_compte_rdc',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number,
    });
  }

  TransNonCompteRdc(sender_id,amount,recever_number,operator_id) {
    return this.http.post(environment.apiUrl + '/paiement/envoie_noncompte_rdc',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number,
      operator_id:operator_id
    });
  }

  TransCompteRdcGabon(sender_id,amount,recever_number) {
    return this.http.post(environment.apiUrl + '/paiement/envoie_rdc_gabon',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number,
    });
  }

  TransCompteGabon(sender_id,amount,recever_number) {
    return this.http.post(environment.apiUrl + '/paiement/envoie_compte_gabon',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number,
    });
  }

  TransNonCompteGabonRdc(sender_id,amount,recever_number,operator_id) {
    return this.http.post(environment.apiUrl + '/paiement/envoie_noncompte_gabon_rdc',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number,
      operator_id : operator_id
    });
  }

  simuler_depot_rdc(form) {
    return this.http.post(environment.apiUrl + '/paiement/simulation/depot_rdc', form);
  }

  simuler_retrait_rdc(sender_id,amount,recever_number,operator_id) {
    return this.http.post(environment.apiUrl + '/paiement/simulation/retrait_rdc',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number,
      operator_id:operator_id
    });
  }
  
  simuler_compte_rdc(sender_id,amount,recever_number) {
    return this.http.post(environment.apiUrl + '/paiement/simulation/envoie_compte_rdc',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number
    });
  }

  simuler_noncompte_rdc(sender_id,amount,recever_number,operator_id) {
    return this.http.post(environment.apiUrl + '/paiement/simulation/envoie_noncompte_rdc',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number,
      operator_id:operator_id
    });
  }
 
  simuler_compte_gabon(sender_id,amount,recever_number) {
    return this.http.post(environment.apiUrl + '/paiement/simulation/envoie_compte_gabon',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number
    });
  }
 
  simuler_noncompte_gabon_rdc(sender_id,amount,recever_number,operator_id) {
    return this.http.post(environment.apiUrl + '/paiement/simulation/envoie_noncompte_gabon_rdc',{
      sender_id:sender_id,
      amount:amount,
      recever_number:recever_number,
      operator_id : operator_id
    });
  }
}
