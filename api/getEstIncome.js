/**
 * Functions used in .filter and .reduce
 */

function _filled(day) {
  return !day.available && day.type === 'reservation';
}

function _hasPrice(day) {
  return day.price !== null;
}

function _sumPrice(sum, day) {
  return sum + day.price.local_price;
}

function _available(day) {
  return day.available;
}

function _hostBusy(day) {
  return !day.available && day.type === 'busy' && day.subtype === 'host_busy';
}


/**
 * Generate estimate income for a particular hosting
 * @param  {Number, String} hosting - Hosting ID
 * @param  {Object} options - Search options, similar to options for .availability()
 * @param  {Function} successCallback - Callback to invoke when successfully calculating est income
 * @param  {Function} failureCallback - Failure callback to invoke
 * @return {Void} - Estimate income is passed onto callbacks
 */
function income(availability) {
  if (!availability) return;
  
  // Process data
  var estIncome = availability.calendar_months.map(function(thisMonth) {
    var days = thisMonth.days,
      daysWithPrice = days.filter(_hasPrice),
      daysAvailable = days.filter(_available),
      daysHostBusy = days.filter(_hostBusy),
      daysReserved = days.filter(_filled),
      avgPrice = daysWithPrice.length ? daysWithPrice.reduce(_sumPrice, 0) / daysWithPrice.length : 0;

    return {
      month: thisMonth.month,
      year: thisMonth.year,
      daysAvailable: daysAvailable.length,
      daysHostBusy: daysHostBusy.length,
      daysReserved: daysReserved.length,
      avgPrice: avgPrice,
      estIncome: avgPrice * daysReserved.length,
      estOpportunityIncome: avgPrice * daysAvailable.length
    };
  });

  return estIncome;  
}

module.exports = income;