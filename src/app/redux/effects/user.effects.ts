import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


import { AuthenticationService } from 'src/app/core/authentication/authentication.service'

import { map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthPageActions from 'src/app/redux/actions/user.actions'
import { PROFILE_PATH } from 'src/app/modules/profile/profile-routing.constants';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  
  // loginUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AuthPageActions.loginUser),
  //     concatMap((action) => 
  //     this.authService.login(action.email, action.password).pipe(
  //       map((user) => AuthPageActions.loginUserSuccess({user})),
  //       tap(() => this.router.navigate([PROFILE_PATH])),
  //       catchError((error) => of(AuthPageActions.loginUserFailure({error})))
  //     ))
  //   )
  // })
}