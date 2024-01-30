import dayjs from 'dayjs';
import JSEntrypt from 'jsencrypt';

function getUserGrade(year) {
  const y = dayjs().year();
  return y - year + (dayjs().month() < 8 ? 0 : 1)
}

function getUserClass(id, code) {
  const classinfo = code ? getUserClassByCode(code) : getUserClassByNumber(id);
  const grade = getUserGrade(classinfo.year);
  return {
    type: classinfo.type,
    grade,
    class: classinfo.class,
    year: classinfo.year
  } 
}

function getUserClassByNumber(id) {
  const classid = Math.floor((id % 10000) / 100);
  const type = classid > 10 ? 'J' : 'Z';
  const classord = classid % 10;
  const year = Math.floor(id / 10000);
  const grade = getUserGrade(year);
  return {
    type,
    year,
    grade,
    class: classord
  } 
}

function getUserClassByCode(code) {
  const year = Math.floor((code % 1000000) / 10000) + 2000;
  const grade = getUserGrade(year);
  const classid = Math.floor((code % 10000) / 100);
  if (code.toString(8).startsWith('09')) {
    return {
      type: classid <= 8 ? 'Z' : 'J',
      year,
      grade,
      class: classid <= 8 ? classid : classid - 8
    }
  } else if (code.toString(8).startsWith('39')) {
    return {
      type: classid <= 2 ? 'Z' : 'J',
      year,
      grade,
      class: classid <= 2 ? classid : classid - 2
    }
  } else {
    return {
      type: 'Z',
      year,
      grade: 0,
      class: classid
    }
  }
}

function getClassName(classType) {
  const title = classType.type === 'J' ? '蛟' : '高';
  const grades = ['一', '二', '三'];
  if (classType.grade === 0) return '未知班级'
  if (classType.class === 0) return `${classType.year} 级`
  if (classType.grade > 3)
    return `${classType.year} 级 ${
      classType.class > 10 ? `蛟 ${classType.class - 10}` : `${classType.class}`
    } 班`
  const grade = grades[classType.grade - 1];
  return `${title}${grade}（${classType.class % 10}）班`
}

function getUserClassName(id, code) {
  return getClassName(getUserClass(id, code))
}

declare const _class_getClassName: typeof getClassName;
declare const _class_getUserClass: typeof getUserClass;
declare const _class_getUserClassByCode: typeof getUserClassByCode;
declare const _class_getUserClassByNumber: typeof getUserClassByNumber;
declare const _class_getUserClassName: typeof getUserClassName;
declare const _class_getUserGrade: typeof getUserGrade;
declare namespace _class {
  export { _class_getClassName as getClassName, _class_getUserClass as getUserClass, _class_getUserClassByCode as getUserClassByCode, _class_getUserClassByNumber as getUserClassByNumber, _class_getUserClassName as getUserClassName, _class_getUserGrade as getUserGrade };
}

declare namespace index$2 {
  export { _class as classname };
}

function getUserPosition(permission) {
  /**
   * 1. Student - 0
   * 2. Secretary - 1
   * 3. Auditor - 2
   * 4. Department - 4
   * 4. Inspector - 8
   * 5. Admin - 16
   * 6. System - 32
   * Stackable, Unique
   */
  const isStudent = true;
  const isSecretary = permission & 1;
  const isDepartment = permission & 2;
  const isAutidor = permission & 4;
  const isInspector = permission & 8;
  const isAdmin = permission & 16;
  const isSystem = permission & 32;
  console.log(
    isStudent,
    isSecretary,
    isDepartment,
    isAutidor,
    isInspector,
    isAdmin,
    isSystem,
    permission
  );
  return ['student', 'secretary', 'department', 'auditor', 'inspector', 'admin', 'system'].filter(
    (_, i) => [isStudent, isSecretary, isDepartment, isAutidor, isInspector, isAdmin, isSystem][i]
  ) 
}

declare const userPosition_getUserPosition: typeof getUserPosition;
declare namespace userPosition {
  export { userPosition_getUserPosition as getUserPosition };
}

declare namespace index$1 {
  export { userPosition as v3 };
}

function generatePayload(password) {
  return JSON.stringify({
    password,
    timestamp: Date.now()
  })
}

function encrypt(payload, publicKey) {
  const encryptor = new JSEntrypt();
  encryptor.setPublicKey(publicKey);
  const credential = encryptor.encrypt(payload);
  return credential
}

declare const rsa_encrypt: typeof encrypt;
declare const rsa_generatePayload: typeof generatePayload;
declare namespace rsa {
  export { rsa_encrypt as encrypt, rsa_generatePayload as generatePayload };
}

declare const index_rsa: typeof rsa;
declare namespace index {
  export { index_rsa as rsa };
}

export { index$2 as data, index as encryption, index$1 as v3 };
