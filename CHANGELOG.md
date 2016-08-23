# Changelog
 ### 0.2.5
  - Include function JS.withRequired, to get joi objects that have property `allowNull:false` as required
  - Include json and jsonb validation [thanks by llonchj](https://github.com/llonchj) [2cd23db](https://github.com/mibrito/joi-sequelize/pull/4)

 ### 0.2.7
  - Include label attribute on sequelize model to fill label function on joi schema
  - Include funciton JS.withRequiredOmit, that works similar as JS.withRequired but omiting keys passed as arguments
  - Include funciton JS.withRequiredPick, that works similar as JS.withRequired but picking only keys passed as arguments
  - Include sequelize's virtual types [thanks by joeybaker] (https://github.com/joeybaker) [69a464b](https://github.com/mibrito/joi-sequelize/pull/6)