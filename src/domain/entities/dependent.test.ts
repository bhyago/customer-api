// import { Dependent } from './dependent'

// describe('[domain] Dependent', () => {
//   it('should create a valid dependent with email', () => {
//     const dependent = Dependent.create({
//       degreekinshipId: 1,
//       employeeId: 1000,
//       genre: 'M',
//       mallId: 5,
//       mallOriginId: 3,
//       name: 'John Doe',
//       responsibleId: 1,
//       email: 'johndoe@example.com',
//       mobileNumber: null,
//       birthday: new Date('2021-002-08'),
//     })

//     expect(dependent).toBeDefined()
//     expect(dependent.props.active).toBe(true)
//     expect(dependent.props.emailValid).toBe(true)
//     expect(dependent.props.responsibleId).toBe(1)
//     expect(dependent.props.mallId).toBe(5)
//     expect(dependent.props.mallOriginId).toBe(3)
//     expect(dependent.props.degreekinshipId).toBe(1)
//     expect(dependent.props.employeeId).toBe(1000)
//     expect(dependent.props.genre).toBe('M')
//     expect(dependent.props.name).toBe('John Doe')
//     expect(dependent.props.mobileNumber).toBe(null)
//     expect(dependent.props.email).toBe('johndoe@example.com')
//     expect(dependent.props.birthday).toStrictEqual(new Date('2021-002-08'))
//   })

//   it('should create a valid dependent with mobile number', () => {
//     const dependent = Dependent.create({
//       degreekinshipId: 1,
//       employeeId: 1002,
//       genre: 'O',
//       mallId: 5,
//       mallOriginId: 2,
//       name: 'John Doe',
//       responsibleId: 2,
//       mobileNumber: '1234567890',
//       email: null,
//       birthday: new Date('2021-002-08'),
//     })

//     expect(dependent.props).toBeDefined()
//     expect(dependent.props.active).toBe(true)
//     expect(dependent.props.emailValid).toBe(null)
//     expect(dependent.props.responsibleId).toBe(2)
//     expect(dependent.props.mallId).toBe(5)
//     expect(dependent.props.mallOriginId).toBe(2)
//     expect(dependent.props.degreekinshipId).toBe(1)
//     expect(dependent.props.employeeId).toBe(1002)
//     expect(dependent.props.genre).toBe('O')
//     expect(dependent.props.name).toBe('John Doe')
//     expect(dependent.props.mobileNumber).toBe('1234567890')
//     expect(dependent.props.birthday).toStrictEqual(new Date('2021-002-08'))
//     expect(dependent.props.email).toBe(null)
//   })
// })
