import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { man } from './man';
import { student } from './student';

@Component({
  selector: 'app-user-management-component',
  templateUrl: './user-management-component.component.html',
  styleUrls: ['./user-management-component.component.css']
})
export class UserManagementComponentComponent implements OnInit {
  myFrom: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  sex: AbstractControl;
  student$: Observable<student>;
  options: any;
  baseUrl = 'http://127.0.0.1:8080/';
  currentStudent: student;
  man$ = 1;
  woman$ = 1;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myFrom = this.fb.group({
      'userName': [''],
      'id': [''],
      'sex': ['']
    });
    this.userName = this.myFrom.controls['userName'];
    this.id = this.myFrom.controls['id'];
    this.sex = this.myFrom.controls['sex'];
  }
  search() {
    if (this.id.value) {

      this.student$ = <Observable<student>>this.httpClient.get(this.baseUrl + 'students/' + this.id.value);
    }
    else {
      this.student$ = <Observable<student>>this.httpClient.get(this.baseUrl + 'students');
    }

  }

  add() {
    console.log(this.myFrom.value);
    this.httpClient.post(this.baseUrl + 'student',
      this.myFrom.value).subscribe(
        (val: any) => { // val是服务器返回的值
          if (val.succ) {
            alert('添加成功!');
            this.ngOnInit();
          }
          else {
            alert(val.msg);
          }
        }
      );
  }
  select(u: student) {
    this.currentStudent = u;
    this.myFrom.setValue(this.currentStudent);
  }

  delete() {
    if (!this.currentStudent) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'student/' +
        this.currentStudent.id).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('删除成功!');
              this.ngOnInit();
            }

          }
        )
    }
  }



  update() {
    if (!this.currentStudent) {
      alert('必须先选择用户!');
    }
    else {
      const x = this.currentStudent.sex;
      this.httpClient.put(this.baseUrl + 'student',
        this.myFrom.value).subscribe(
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
  /* 页面初始化 */
  ngOnInit(): void {
    this.student$ = <Observable<student>>this.httpClient.get(this.baseUrl + 'students');
    this.httpClient.put(this.baseUrl + 'people', this.myFrom.value).subscribe(
      (val: any) => {
        this.man$ = val.succ;
        this.woman$ = val.ss;
        this.options = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: '性别',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.woman$, name: '女' },
                { value: this.man$, name: '男' },
              ]
            }
          ]
        }
      }
    )
  }

}
