export enum RoleEnum {
  Admin = "Admin",
  AdminTH = 'ผู้ดูแลระบบ',

  Manager = "Manager",
  ManagerTH = 'ผู้จัดการร้าน',

  Cashier = "Cashier",
  CashierTH = "พนักงานขาย",

  StockKeeper = "StockKeeper",
  StockKeeperTH = "พนักงานจัดการสต็อก",

  Customer = "Customer",
  CustomerTH = "ลูกค้าทั่วไป",

  Member = "Member",
  MemberTH = "สมาชิก",

  Guest = "Guest",
  GuestTH = "ผู้ใช้ที่ไม่ได้ลงทะเบียน"
}
export const RoleType = [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Cashier, RoleEnum.StockKeeper, RoleEnum.Customer, RoleEnum.Member, RoleEnum.Guest];