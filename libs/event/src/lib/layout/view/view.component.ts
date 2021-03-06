import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Event } from '../../+state/event.model';
import { InvitationService, Invitation, InvitationQuery } from '@blockframes/invitation/+state';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'event-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventViewComponent implements OnInit {
  private _event = new BehaviorSubject<Event>(null);
  event$ = this._event.asObservable();
  invitation$: Observable<Invitation>;
  editMeeting: string;

  @Input()
  get event() {
    return this._event.getValue();
  }
  set event(event: Event) {
    this._event.next(event);
  }

  constructor(
    private invitationService: InvitationService,
    private invitationQuery: InvitationQuery,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.editMeeting = `/c/o/dashboard/event/${this.event.id}/edit`;

    this.invitation$ = this.event$.pipe(
      switchMap(event => this.invitationQuery.selectByDocId(event.id)),
      shareReplay(1)
    );
  }

  goBack() {
    this.location.back();
  }

  /**
   * Creates a request to attend event.
   * If event is public (event.isPrivate === false), it will be automatically setted to 'accepted'
   */
  addToCalendar() {
    this.invitationService.request(this.event.type === 'meeting' ? 'user' : 'org', this.event.ownerId).from('user').to('attendEvent', this.event.id);
  }
}
