module.exports = {
  // How many CPU-threads should be used to process logs
  threads: 1,

  // The list of valid days in a month
  days: ['01'],//,'02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],

  // The directory that holds the logs
  baseFilePath: '../replay-parser/',

  // The directory to store the raw data dumps
  rawDataDir: 'raw/',

  // The directory to store the compiled data
  compiledDataDir: 'compiled/',

  // The directory to store the formatted data
  formattedDataDir: 'formatted/',

  // The directory to store the ranking data
  usageDataDir: 'usage/',

  // The directory to store the formatted JSON data
  JSONDataDir: 'json/'
}
