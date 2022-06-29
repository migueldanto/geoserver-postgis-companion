import { TestBed } from '@angular/core/testing';

import { OnlyUnauthenticatedUsersGuard } from './only-unauthenticated-users.guard';

describe('OnlyUnauthenticatedUsersGuard', () => {
  let guard: OnlyUnauthenticatedUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyUnauthenticatedUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
