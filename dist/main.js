import dayjs from 'dayjs';

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

var _class = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getClassName: getClassName,
  getUserClass: getUserClass,
  getUserClassByCode: getUserClassByCode,
  getUserClassByNumber: getUserClassByNumber,
  getUserClassName: getUserClassName,
  getUserGrade: getUserGrade
});

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  classname: _class
});

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

var userPosition = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getUserPosition: getUserPosition
});

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  v3: userPosition
});

export { index$1 as data, index as v3 };
//# sourceMappingURL=main.js.map
