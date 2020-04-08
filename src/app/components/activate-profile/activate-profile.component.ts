import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../admin/shared/dataservice";

@Component({
  selector: 'app-activate-profile',
  templateUrl: './activate-profile.component.html',
  styleUrls: ['./activate-profile.component.css']
})
export class ActivateProfileComponent implements OnInit {

  private emailCode: string;
  private loading = true;
  private success = false;


  constructor(private activatedRoute: ActivatedRoute,
              private route: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.emailCode = this.activatedRoute.snapshot.params.emailCode;
    this.dataService.activateUser(this.emailCode).subscribe(value => {
      console.log(value);
      if (value.status) {
        this.loading = false;
        console.log("hjghj")
        this.success = true;
      }else {
        this.loading = false;
      }
    });
  }

  login() {
    this.route.navigateByUrl('/login');
  }
}
