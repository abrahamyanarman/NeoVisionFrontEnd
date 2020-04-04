import { Component, OnInit } from '@angular/core';
import {ConfirmService} from './service/confirm.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public isReady = false;
  public message: string;

  constructor(private confirmService: ConfirmService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const code = this.activatedRoute.snapshot.params.code;
    this.confirmService.confirmAccount(code).subscribe(response => {
      this.message = response.message;
      this.isReady = true;
    }, error => {
      this.message = error.error.message;
      this.isReady = true;
    });
  }

}
