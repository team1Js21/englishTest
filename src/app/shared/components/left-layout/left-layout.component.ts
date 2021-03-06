import { Component, Input, OnInit } from '@angular/core';
import { getUrlName } from '../../utils/utils';

export interface AboutText {
  title: string;
  text: string;
}

@Component({
  selector: 'app-left-layout',
  templateUrl: './left-layout.component.html',
  styleUrls: ['./left-layout.component.scss'],
})
export class LeftLayoutComponent implements OnInit {
  @Input() about: AboutText[] = [];
  url = getUrlName();

  
  constructor() {}

  ngOnInit() {}
}
