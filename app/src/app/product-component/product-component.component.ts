import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { product } from './product';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  myForm: FormGroup;
  pName: AbstractControl;
  id: AbstractControl;
  num: AbstractControl;
  product$: Observable<product>;
  currentProduct: product;
  options: any;
  pid: [''];
  pnum: [''];
  baseUrl = 'http://127.0.0.1:8080/';
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'pName': [''],
      'id': [''],
      'num': ['']
    });
    this.pName = this.myForm.controls['pName'];
    this.id = this.myForm.controls['id'];
    this.num = this.myForm.controls['num'];
  }

  search() {
    if (this.id.value) {

      this.product$ = <Observable<product>>this.httpClient.get(this.baseUrl + 'products/' + this.id.value);
    }
    else {
      this.product$ = <Observable<product>>this.httpClient.get(this.baseUrl + 'products');
    }
  }
  add() {
    this.httpClient.post(this.baseUrl + 'product',
      this.myForm.value).subscribe(
        (val: any) => { // val是服务器返回的值
          if (val.succ) {
            alert('添加成功！');
            this.ngOnInit();
          }
        })
  }
  delete() {
    if (!this.currentProduct) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'product/' +
        this.currentProduct.id).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('删除成功!');
              this.ngOnInit();
            }

          }
        )
    }
  }
  select(u: product) {
    this.currentProduct = u;
    this.myForm.setValue(this.currentProduct);
  }
  update() {
    if (!this.currentProduct) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.put(this.baseUrl + 'product',
        this.myForm.value).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('修改成功!');
              this.ngOnInit();
            }
            else {
              alert(val.msg)
            }
          }
        )
    }
  }
  ngOnInit(): void {
    this.product$ = <Observable<product>>this.httpClient.get(this.baseUrl + 'products');
    this.httpClient.post(this.baseUrl + 'pid', this.myForm.value).subscribe(
      (val: any) => {
        this.pid = val.succ;
        this.pnum = val.s;
        this.options = {

          xAxis: {
            type: 'category',
            data: this.pid
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.pnum,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }]
        }
      }
    )

  }
}

