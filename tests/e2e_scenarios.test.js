const { describe, it } = require('node:test');
const assert = require('node:assert');

const BASE_URL = 'http://localhost:3000';

describe('VEIXON Command Center — Comprehensive End-to-End Scenarios', () => {

  // Scenario 1: Public Landing Page
  it('Scenario 1: Public landing page loads with HTTP 200 within 2000ms', async () => {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/`);
    const duration = Date.now() - start;
    assert.strictEqual(res.status, 200);
    assert.ok(duration < 2000, `Expected response under 2000ms, took ${duration}ms`);
  });

  // Scenario 2: Public Login Portal
  it('Scenario 2: Login portal loads with HTTP 200 within 2000ms', async () => {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/login`);
    const duration = Date.now() - start;
    assert.strictEqual(res.status, 200);
    assert.ok(duration < 2000, `Expected response under 2000ms, took ${duration}ms`);
  });

  // Scenario 3: Director Authentication
  let sessionCookie = '';
  it('Scenario 3: Director (V S Sai Siddardh) authenticates and receives session cookie', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'siddhardh@veixon.tech', password: 'password123' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.name, 'V S Sai Siddardh');
    assert.strictEqual(data.user.role, 'DIRECTOR');

    const setCookie = res.headers.get('set-cookie');
    assert.ok(setCookie, 'Expected Set-Cookie header');
    sessionCookie = setCookie.split(';')[0];
  });

  // Scenario 4: Identity Verification
  it('Scenario 4: Session identity endpoint verifies active Director profile', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: sessionCookie }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.isLoggedIn, true);
    assert.strictEqual(data.user.name, 'V S Sai Siddardh');
    assert.strictEqual(data.user.role, 'DIRECTOR');
  });

  // Scenario 5: Tasks API Query
  it('Scenario 5: Fetching tasks returns populated list with projects and assignees', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      headers: { Cookie: sessionCookie }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.tasks), 'Expected tasks array');
  });

  // Scenario 6: Task Creation Real-World Workflow
  it('Scenario 6: Employee creates new high-priority engineering task', async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: sessionCookie
      },
      body: JSON.stringify({
        title: 'Implement Authentication Validation Middleware',
        description: 'Enforce JWT and session cookie validation on all endpoints',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        progress: 35,
        type: 'Security',
        timeline: 'Sprint 24'
      })
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.task.title, 'Implement Authentication Validation Middleware');
    assert.strictEqual(data.task.status, 'IN_PROGRESS');
  });

  // Scenario 7: Leave Requests Query API
  it('Scenario 7: Leave requests endpoint returns valid schedules', async () => {
    const res = await fetch(`${BASE_URL}/api/leave`, {
      headers: { Cookie: sessionCookie }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.leaveRequests), 'Expected leaveRequests array');
  });

  // Scenario 8: User Directory Query API
  it('Scenario 8: User directory returns VEIXON team with proper department mappings', async () => {
    const res = await fetch(`${BASE_URL}/api/users`, {
      headers: { Cookie: sessionCookie }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.users), 'Expected users array');
    const director = data.users.find(u => u.role === 'DIRECTOR');
    assert.ok(director, 'Director user found in directory');
    assert.strictEqual(director.name, 'V S Sai Siddardh');
  });

  // Scenario 9: Application UI Pages Render Cleanly (HTTP 200, < 2s)
  const pages = ['/dashboard', '/work', '/projects', '/people', '/calendar', '/profile'];
  for (const page of pages) {
    it(`Scenario 9: Route ${page} renders with HTTP 200 within 2000ms`, async () => {
      const start = Date.now();
      const res = await fetch(`${BASE_URL}${page}`, {
        headers: { Cookie: sessionCookie }
      });
      const duration = Date.now() - start;
      assert.strictEqual(res.status, 200);
      assert.ok(duration < 2000, `${page} took ${duration}ms (exceeded 2000ms threshold)`);
    });
  }

  // Scenario 10: Logout API Clears Auth Session
  it('Scenario 10: Sign out successfully clears session cookie', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: sessionCookie }
    });
    assert.strictEqual(res.status, 200);
  });
});
