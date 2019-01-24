import { Component, OnInit } from '@angular/core';
import { Class } from './../Model/Class';
import * as db from '../../../databaseconnection';

// CHanged
const mysql = require('mysql');

import * as mySql from 'C:/Users/mpointer/AppData/Local/Microsoft/TypeScript/3.2/node_modules/@types/mysql/index';


@Component({
  selector: 'app-class-list-screen',
  templateUrl: './class-list-screen.component.html',
  styleUrls: ['./class-list-screen.component.css']
})
export class ClassListScreenComponent implements OnInit {

  professorsClassList: Class[];
  selectClassHTMLToggle: boolean;
  selectedClass: string[];
  constructor() {
    this.selectClassHTMLToggle = true;
    this.professorsClassList = [];
    this.selectedClass = [];
    // console.log('Waiting for database...');
    // db.test('test');


    // this.query('SELECT * FROM TA');



    // db.query('SELECT * FROM TA');
  }

  ngOnInit() {
    this.setProfClassList();
  }

  public query(str, ...params) {

    const con = mysql.createConnection({
      host: '104.196.121.215',
      user: 'tester',
      password: 'vcu',
      database: 'tamanagement',
    });

    console.log('Waiting for database...');
    con.connect(function (err) {
      if (err) {
        console.log('error connecting', err);
        throw err;
      } else {
        // tslint:disable-next-line:no-shadowed-variable
        con.query(str, function (err, result, fields) {
          console.log(result);
        });
        console.log('Connected!');
      }
    });

    // return new Promise((resolve, reject) => {
    //   con.query(str, param, (err, result, fields) => {
    //     if(err){
    //       reject(err);
    //     }else{
    //       resolve(result);
    //     }
    //   });
    // });
  }

  public setProfClassList() {
    // Need way to get teacher's list of Courses from backend to populate here in the front end.
    // For now, Create 3 mock class Objects (see Class.ts for the class interface) and populate them to the class list

    for (let i = 0; i < 3; i++) {
      const temp: Class = {
        className: 'Biology ' + i,
        classNumber: 100 + i
      };
      this.professorsClassList.push(temp);
    }
  }

  public selectClass(className: string) {
    this.selectClassHTMLToggle = false;
    this.selectedClass[0] = className;
  }

  // public buildClass(): Class {
  //  const
  // }

}
