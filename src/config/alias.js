const alias = (prefix) => ({
  '@utils': `${prefix}/utils/`,
  '@type': `${prefix}/types/`,
  '@hooks': `${prefix}/hooks/`,
  '@pages': `${prefix}/pages/`,
  '@talons': `${prefix}/talons/`,
  '@layout': `${prefix}/layout/`,
  '@config': `${prefix}/config/`,
  '@shared': `${prefix}/shared/`,
  '@context': `${prefix}/context/`,
  '@images': `${prefix}/assets/images/`,
  '@components': `${prefix}/components/`,
  '@constants': `${prefix}/constants`,
  '@redux': `${prefix}/redux/`,
  '@hoc': `${prefix}/hoc`,
});

module.exports = alias;
