import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProfileController} from '@finance-web/controller/ProfileController';
import {UserData} from '@finance-web/models/profile/UserData';
import {FileInfo} from '@finance-web/models/file/FileInfo';
import {BankContactController} from '@finance-web/controller/BankContactController';
import {HttpService} from "@finance.workspace/http-service";

@Component({
  selector: 'app-profile-borrower-data',
  templateUrl: './profile-borrower-data.component.html',
  styleUrls: ['./profile-borrower-data.component.scss']
})
export class ProfileBorrowerDataComponent implements OnInit {

  form: FormGroup;
  userData: UserData;
  documents: FileInfo[] = [];

  constructor(private fb: FormBuilder,
              private profileController: ProfileController,
              private bankController: BankContactController,
              private http: HttpService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      iin: [''],
      fullName: [''],
      dateOfBirth: [''],
      phone: [''],
      address: [''],
      workExperience: [''],
      incomeAmount: [''],
      proofOfIncome: [false],
      termOfPolicy: [false]
    });

    this.profileController.getUserData().then(res => {
      this.userData = res;
      this.form.patchValue(this.userData);
    });

    this.profileController.getDocuments().then(res => {
      this.documents = res;
    });
  }

  onFileChanged(event: any) {
    const fileInfo: FileInfo = {} as FileInfo;
    const reader = new FileReader();
    fileInfo.name = event.target.files[0].name;
    fileInfo.size = event.target.files[0].size;
    fileInfo.mimeType = event.target.files[0].type;
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = async (ev: any) => {
      fileInfo.base64data = ev.target.result.split(',')[1];
      this.bankController.saveFileId(fileInfo).then(x => {
        fileInfo.fileId = x;
        this.profileController.saveDocument(x);
        this.documents.push(fileInfo);
      });
    };
  }

  delete(fileId: string) {
    this.profileController.deleteDocument(fileId).then(() => {
      this.documents = this.documents.filter(x => x.fileId !== fileId);
    });
  }

  downloadDoc(document: string) {
    const httpS: HttpService = this.http.setControllerPrefix("file");
    return  httpS.downloadResource("/download-photo" + '?fileId=' + document).then();
  }
}
