import http from 'k6/http';
import { check, sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
  vus: 500,
  duration: '30s',
};

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

export default function () {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const payload = JSON.stringify({
    national_id: `K6-${uuidv4()}`,
    full_name: `K6 User ${__VU}-${__ITER}`,
    city_district: city,
    date_of_birth: '1990-01-01',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post('http://localhost:3000/register', payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
  });

  sleep(0.1);
}
