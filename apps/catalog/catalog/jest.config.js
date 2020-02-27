module.exports = {
  name: 'catalog',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/catalog',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
