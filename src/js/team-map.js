// locations.js
const locations = [
  // London
  [51.5072, -0.1276, 'London, UK', [
    { name: 'Adisa', linkedin: 'http://www.linkedin.com/in/oluwadolapo-adisa-915a6311a', category: 'Business' },
    { name: 'Sophie', linkedin: 'https://www.linkedin.com/in/sophie-lam-182b44264', category: 'Business, Psychology' },
    { name: 'Savitha (Sav)', linkedin: 'https://www.linkedin.com/in/savitha-balanthiran-507616319', category: 'Psychology' },
    { name: 'Farid', linkedin: 'https://www.linkedin.com/in/farid-tan/', category: 'Technical' },
    { name: 'Clara', linkedin: '#', category: 'Technical' },
    { name: 'Zahra', linkedin: 'https://www.linkedin.com/in/zahra-kanji-174408290/', category: 'Technical' },
    { name: 'Tazrian', linkedin: 'https://www.linkedin.com/in/tazrian-kabir-b42550323/', category: 'Technical' },
    { name: 'Sidhiq Ali', linkedin: 'https://www.linkedin.com/in/sidhiqali/', category: 'Technical' },
    { name: 'Yahia Hnid', linkedin: 'https://www.linkedin.com/in/yahia-hnid-b34266215/', category: 'Technical' },
    { name: 'Fatima', linkedin: 'http://linkedin.com/in/fatima-farah-172070299', category: 'Technical' },
    { name: 'Riya', linkedin: 'https://www.linkedin.com/in/riya-b-506346315', category: 'Technical' },
    { name: 'Supriya', linkedin: 'https://www.linkedin.com/in/supriya-busa-7663b5270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', category: 'Technical, Business' },
    { name: 'Emily', linkedin: 'https://www.linkedin.com/in/emily-ng-london', category: 'Unknown' },
    { name: 'Miftahul Munawar', linkedin: '#', category: 'Technical, Business' }
  ]],

  // Manchester
  [53.4808, -2.2426, 'Manchester, UK', [
    { name: 'Ying', linkedin: '#', category: 'Business, Psychology' },
    { name: 'Usman', linkedin: 'https://www.linkedin.com/in/usman-farooq-8770b5191/', category: 'Technical' },
    { name: 'Thuso Nyoni', linkedin: 'https://www.linkedin.com/in/thuso-n-nyoni2000/', category: 'Business' }
  ]],

  // Birmingham
  [52.4862, -1.8904, 'Birmingham, UK', [
    { name: 'Vanshika', linkedin: 'https://www.linkedin.com/in/vanshika-gupta-0b216b25b/', category: 'Business' },
    { name: 'Alisha', linkedin: '#', category: 'Business' }
  ]],

  // Edinburgh
  [55.9533, -3.1883, 'Edinburgh, UK', [
    { name: 'Kacey', linkedin: 'https://www.linkedin.com/in/kaceyko/', category: 'Business' },
    { name: 'Emilia Samian', linkedin: '#', category: 'Technical' }
  ]],

  // Nottingham
  [52.9548, -1.1581, 'Nottingham, UK', [
    { name: 'Natasha', linkedin: 'https://www.linkedin.com/in/natasha-yeoh-b58014268/', category: 'Business' },
    { name: 'lillie', linkedin: 'https://www.linkedin.com/in/lillie-atkinson-536275197/', category: 'Psychology' },
    { name: 'Irene', linkedin: '#', category: 'Technical' }
  ]],

  // Other UK Cities
  // some issue outside leeds - not sure why (cate)

  [52.4068, -1.5124, 'Coventry, UK', [{ name: 'Vanessa', linkedin: 'https://www.linkedin.com/in/vanessa-kimoli', category: 'Business' }]],
  [53.795, -1.759, 'Bradford, UK', [{ name: 'Raghad', linkedin: 'https://www.linkedin.com/in/raghadshanti/', category: 'Business, Unknown' }]],
  [57.1497, -2.0943, 'Aberdeen, UK', [{ name: 'Dinura', linkedin: 'https://www.linkedin.com/in/dinura-dass/', category: 'Business' }]],
  [54.9784, -1.6174, 'Newcastle, UK', [{ name: 'Abdul Alim', linkedin: 'https://linkedin.com/in/abdul-alim-839171271', category: 'Psychology' }]],
  [51.6611, -0.3970, 'Watford, UK', [{ name: 'Evgeny Kogun', linkedin: '#', category: 'Technical' }]],
  [51.509865, -0.118092, 'Slough, UK', [{ name: 'Aryan Jain', linkedin: '#', category: 'Business' }]],
  [53.6458, -1.7851, 'Huddersfield, UK', [{ name: 'Tar', linkedin: '#', category: 'Business, Technical' }]],
  [51.6234, 0.3058, 'Brentwood, Essex, UK', [{ name: 'Patrick', linkedin: 'https://www.linkedin.com/in/patrick-lawlor-2g24/', category: 'Technical' }]],
  [54.5973, -5.9301, 'Belfast, UK', [
    { name: 'Eve', linkedin: 'https://www.linkedin.com/in/eve-chen-598081356', category: 'Technical' },
    { name: 'Cate', linkedin: 'https://www.linkedin.com/in/cate-james-b5459b183', category: 'Technical' }
  ]],
  [54.0474, -2.8001, 'Lancaster, UK', [{ name: 'Siem', linkedin: 'https://www.linkedin.com/in/siem-berhane', category: 'Technical' }]],
  [50.9097, -1.4044, 'Southampton, UK', [{ name: 'Zu', linkedin: 'https://www.linkedin.com/in/zu-ziolek/', category: 'Technical' }]],
  [52.7722, -1.2077, 'Loughborough, UK', [{ name: 'Adrian', linkedin: '#', category: 'Technical' }]],
  [54.7769, -1.5762, 'Durham, UK', [{ name: 'Gladys', linkedin: 'https://www.linkedin.com/in/gladys-neo-020777331/', category: 'Technical' }]],
  [50.8225, -0.1372, 'Brighton, UK', [{ name: 'Nazanin', linkedin: '#', category: 'Technical' }]],
  [56.3449, -2.7945, 'St Andrews, UK', [{ name: 'Jeremy Kwan', linkedin: 'https://www.linkedin.com/in/jeremy-kwan-73a84b294', category: 'Business' }]],
  [56.1165, -3.9369, 'Stirling, UK', [{ name: 'Neeraj', linkedin: '#', category: 'Unknown' }]],

  // Europe (Not UK)
  [59.1386, 9.6555, 'Porsgrunn, Norway', [{ name: 'Michalina', linkedin: 'https://www.linkedin.com/in/michalinambukowiecka/', category: 'Business' }]],
  [44.8015, 10.3280, 'Parma, Italy', [{ name: 'Lisa', linkedin: 'https://www.linkedin.com/in/lisa-lin-418b36362/', category: 'Business' }]],
  [50.8660, 20.6286, 'Kielce, Poland', [{ name: 'Akram', linkedin: 'https://www.linkedin.com/in/akram-el-gouri-90104924b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', category: 'Technical' }]],

  // Asia
  [28.6139, 77.2088, 'New Delhi, India', [
    { name: 'Abhinav', linkedin: 'https://www.linkedin.com/in/theabhinavkaushik', category: 'Business' },
    { name: 'Sakshi', linkedin: 'https://www.linkedin.com/in/sakshi-902777290/', category: 'Technical, Psychology' }
  ]],
  [12.9629, 77575, 'Bengaluru, India', [{ name: 'Kunal Bist', linkedin: 'https://www.linkedin.com/in/kunal-bist-994a30224', category: 'Business' }]],
  [22.9868, 87.8550, 'West Bengal, India', [{ name: 'Rajat Sharma', linkedin: 'https://www.linkedin.com/in/rajat-sharma-447841109?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', category: 'Business' }]],
  [7.2527, 80.3418, 'Kegalle, Sri Lanka', [{ name: 'Dulith', linkedin: 'https://www.linkedin.com/in/dulith-chandira', category: 'Technical' }]],
  [3.1319, 101.6841, 'Kuala Lumpur, Malaysia', [
    { name: 'Aquiles', linkedin: 'https://www.linkedin.com/in/aquiles-hugo/', category: 'Business' },
    { name: 'Arun', linkedin: 'https://www.linkedin.com/in/arunachaleshwar-garimalla-96250b28b/', category: 'Technical' }
  ]],

  // Africa
  [30.0444, 31.2357, 'Cairo, Egypt', [
    { name: 'Mouayad', linkedin: 'http://linkedin.com/in/mouayad-al-habbal-76b534199', category: 'Business' },
    { name: 'Fares', linkedin: '#', category: 'Technical' }
  ]],
  [6.3350, 5.6037, 'Benin, Nigeria', [{ name: 'Ubong', linkedin: 'https://www.linkedin.com/in/ubongasuquo/', category: 'Technical' }]],
  [9.0563, 7.4985, 'Abuja, Nigeria', [
    { name: 'Nosa', linkedin: '#', category: 'Technical' },
    { name: 'Zuwairah', linkedin: 'https://www.linkedin.com/in/zuwairah-1104?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', category: 'Technical' },
    { name: 'Irene Ereku', linkedin: 'https://www.linkedin.com/in/irene-ereku-6867001bb', category: 'Technical' },
    { name: 'Francis Uko', linkedin: 'https://www.linkedin.com/in/francis-uko/', category: 'Technical' }
  ]]
];