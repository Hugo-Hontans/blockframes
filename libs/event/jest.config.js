module.exports = {
  name: 'event',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/event',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
