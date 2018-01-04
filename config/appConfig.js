module.exports = {
  // How many cores should be used to process logs
  cores: 1,

  // The list of valid days in a month
  days: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],

  // The directory that holds the logs
  baseFilePath: '../../Downloads/',

  // The directory to store the raw data dumps
  rawDataDir: 'raw/',

  // The directory to store the compiled data
  compiledDataDir: 'compiled/'
}