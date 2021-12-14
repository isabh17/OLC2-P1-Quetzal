var faker = window.faker

var examples = {}
window.examples = examples

// Basic - shows what a default table looks like
examples.basic = function () {
  var doc = new jsPDF()

  // From HTML
  doc.autoTable({ html: '.table' })

  // From Javascript
  var finalY = doc.lastAutoTable.finalY || 10
  doc.text('From javascript arrays', 14, finalY + 15)
  doc.autoTable({
    startY: finalY + 20,
    head: [['ID', 'Name', 'Email', 'Country', 'IP-address']],
    body: [
      ['1', 'Donna', 'dmoore0@furl.net', 'China', '211.56.242.221'],
      ['2', 'Janice', 'jhenry1@theatlantic.com', 'Ukraine', '38.36.7.199'],
      [
        '3',
        'Ruth',
        'rwells2@constantcontact.com',
        'Trinidad and Tobago',
        '19.162.133.184',
      ],
      ['4', 'Jason', 'jray3@psu.edu', 'Brazil', '10.68.11.42'],
      ['5', 'Jane', 'jstephens4@go.com', 'United States', '47.32.129.71'],
      ['6', 'Adam', 'anichols5@com.com', 'Canada', '18.186.38.37'],
    ],
  })

  finalY = doc.lastAutoTable.finalY
  doc.text('From HTML with CSS', 14, finalY + 15)
  doc.autoTable({
    startY: finalY + 20,
    html: '.table',
    useCss: true,
  })

  return doc
}
/*
 |--------------------------------------------------------------------------
 | Below is some helper functions for the examples
 |--------------------------------------------------------------------------
 */

 function headRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ]
  }
  
  function footRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ]
  }
  
  function columns() {
    return [
      { header: 'ID', dataKey: 'id' },
      { header: 'Name', dataKey: 'name' },
      { header: 'Email', dataKey: 'email' },
      { header: 'City', dataKey: 'city' },
      { header: 'Exp', dataKey: 'expenses' },
    ]
  }
  
  function data(rowCount) {
    rowCount = rowCount || 10
    var body = []
    for (var j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        expenses: faker.finance.amount(),
      })
    }
    return body
  }
  
  function bodyRows(rowCount) {
    rowCount = rowCount || 10
    var body = []
    for (var j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        expenses: faker.finance.amount(),
      })
    }
    return body
  }