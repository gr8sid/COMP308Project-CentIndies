import { Answer } from "src/app/models/answer";
import { AnswerService } from "./../../services/answer.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-survey-answers",
  templateUrl: "./survey-answers.component.html",
  styleUrls: ["./survey-answers.component.css"]
})
export class SurveyAnswersComponent implements OnInit {
  answers: Answer[];
  title: string;
  constructor(
    private answerService: AnswerService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.answers = new Array<Answer>();
    this.title = this.activatedRoute.snapshot.data.title;
    this.displayAnswerList();
  }

  private displayAnswerList(): void {
    this.answerService.getAnswerList().subscribe(data => {
      if (data.success) {
        this.answers = data.answerList;
      } else {
        this.flashMessages.show("User must be logged-in!!!", {
          cssClass: "alert-danger",
          timeOut: 3000
        });
      }
    });
  }
  public captureScreen() {
    var data = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MySurveyReport.pdf"); // Generated PDF
    });
  }
}
