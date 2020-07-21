/* eslint-disable no-useless-escape */
/**
 *   @fileOverview - regular expressions for available fields
 *   @exports rules
* */

const rules = {
  validName: /^[a-zA-Z]+$/,
  validNumber: /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/,
  fullName: /^([\w]{3,})+\s+([\w\s]{3,})+$/i,
  validAddress: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  empty: /^(\S+)/,
  validEmail: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|com.ng|ng|co.uk|gov|biz|info|mobi|name||jobs|edu.ng)\b/,
  nameLength: /^[a-zA-Z]{2,30}$/,
  passwordLength: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  validUuid: /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/,
  desc: /^[a-zA-Z\s]*$/,
  validCode: /^[A-Z0-9]*$/,
  name: /^[a-zA-Z ]*$/,
};

export default rules;
