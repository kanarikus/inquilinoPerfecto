require('dotenv').config()

const bcrypt = require('bcrypt');
const faker = require("faker/locale/es");
const { getConnection } = require("./db");
const {random} = require("lodash");
const {dateToDB,sevenDays} = require('../utils/moment')

async function main() {
  let connection;
    
  try {
    connection = await getConnection();

    await connection.query("DROP TABLE IF EXISTS reserva CASCADE");
    await connection.query("DROP TABLE IF EXISTS imagen CASCADE"); 
    await connection.query("DROP TABLE IF EXISTS piso CASCADE"); 
    await connection.query("DROP TABLE IF EXISTS usuario CASCADE");

    await connection.query(`create table if not exists usuario(
      id int unsigned auto_increment primary key,
      nombre varchar(20),
      apellidos varchar(100),
      Provincia varchar(100),
      ciudad varchar(100) not null,
      email varchar(200) not null,
      password varchar(100) not null,
      validationCode varchar(100),
      telf varchar(20),
      image varchar(500),
      score float,
      estado enum('Activo','Inactivo') not null default 'Inactivo',
      descripcion text,
      role enum('usuario','admin') not null default 'usuario',
      updateDate timestamp default current_timestamp
    );`)
    console.log('tabla usuario creado')
    await connection.query(`create table if not exists piso(
      id int unsigned auto_increment primary key,
      direccion varchar(100) not null,
      provincia varchar(100) not null,
      ciudad varchar(100) not null,
      precio_piso bigint unsigned not null,
      m2 float not null,
      habitaciones smallint unsigned not null,
      baños smallint unsigned not null,
      garaje enum('si','no') default 'no',
      ascensor enum('si','no') default 'no',
      balcon enum('si','no') default 'no',
      jardin enum('si','no') default'no',
      descripcion text,
      id_usuario int unsigned not null,
      fecha_publicacion timestamp default current_timestamp,
      fecha_modificacion timestamp default current_timestamp on update current_timestamp,
      score float,
      estado enum('Activo','Inactivo'),
      constraint piso_usuario_fk1 foreign key (id_usuario)
		    references usuario(id)
    );`)
      console.log('**Tabla Pisos creada**')
    await connection.query(`create table if not exists imagen(
      id int unsigned auto_increment primary key,
      imagen varchar(500),
      id_piso int unsigned not null,
      constraint imagen_id_piso_fk1 foreign key (id_piso)
		    references piso(id)
    );`)

    await connection.query(`create table if not exists reserva (
      id_reserva int unsigned auto_increment primary key,
      precio_reserva bigint unsigned not null,
      fecha_reserva timestamp default current_timestamp,
      fecha_entrada date,
      fecha_salida date,
      score_piso float,
      score_usuario float,
      estado enum('aceptado','pendiente','declinado') default 'pendiente' not null,
      id_piso int unsigned not null,
      id_usuario int unsigned not null,
      constraint reserva_id_piso_fk1 foreign key (id_piso)
		    references piso(id),
	    constraint reserva_id_isuario_fk2 foreign key (id_usuario)
		    references usuario(id)
    );`)
    console.log('**Creadas tablas satisfactoriamente**')

    const passwordBcrypt = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);
    await connection.query(
      `insert into usuario (nombre, provincia,ciudad, email, password, role, estado) values ('antonio','provincia','vigo', ?,?, 'admin', 'Activo')`,
      ['tony_balu@hotmail.com', passwordBcrypt]
    )

    let usuarios = 100;
    for (let i = 1; i <= usuarios; i++) {
    const name = faker.name.firstName();
    const apellidos = faker.name.lastName();
    const provincia = faker.address.state();
    const ciudad = faker.address.cityPrefix();
    const email = faker.internet.email();
    await connection.query(`
          insert into usuario (
            nombre,
            apellidos,
            provincia,
            ciudad,
            email,
            password,
            estado)
            values (
            "${name}",
            "${apellidos}",
            "${provincia}",
            "${ciudad}",
            "${email}",
            "${passwordBcrypt}",
            "Activo")
          `);
    }
    console.log(`tabla usuarios creados`);
    
    let pisos = 300;
    for (let i = 1; i <= pisos; i++) {
    const provincia = faker.address.state();
    const ciudad = faker.address.cityPrefix();
    const direccion = faker.address.streetAddress();
    const baños = random(1, 5);
    const habitaciones = random(2, 10);
    const m2 = random(40, 300);
    const precio_piso = random(200, 1000);
    const garaje = faker.random.arrayElement(['si','no']);
    const jardin = faker.random.arrayElement(['si','no']);
    const ascensor = faker.random.arrayElement(['si','no']);
    const balcon = faker.random.arrayElement(['si','no']);
    const id_usuario = random(1, 100);
    await connection.query(`
          insert into piso (
            direccion,
            provincia,
            ciudad,
            precio_piso,
            m2,
            habitaciones,
            baños,
            garaje,
            ascensor,
            balcon,
            jardin,
            id_usuario)
            values (
            "${direccion}", 
            "${provincia}",
            "${ciudad}",
            "${precio_piso}",
            "${m2}",
            "${habitaciones}",
            "${baños}",
            "${garaje}",
            "${ascensor}",
            "${balcon}",
            "${jardin}",
            "${id_usuario}"
            )
          `);
    }
    console.log("pisos creados");

    let reserva = 50;
    for (let i = 1;i<=reserva;i++) {
      const id_usuario = random(1,50)
      const id_piso = i
      const score_piso = random(0,5)
      const score_usuario = random(0,5)
      const estado = faker.random.arrayElement(['aceptado','pendiente','declinado'])
      const precio_reserva = random(200,1000)
      const fecha_entrada = faker.date.future();
      const fecha_entradaDB = dateToDB(fecha_entrada)
      const fecha_salida = sevenDays(fecha_entrada)
 
      await connection.query(`
      insert into reserva(
        precio_reserva,
        fecha_entrada,
        fecha_salida,
        score_piso,
        score_usuario,
        estado,
        id_piso,
        id_usuario)
        values(
        "${precio_reserva}",
        "${fecha_entradaDB}",
        "${fecha_salida}",
        "${score_piso}",
        "${score_usuario}",
        "${estado}",
        "${id_piso}",
        "${id_usuario}"
      )`)
    }
    console.log('tablas reserva creadas')
  } catch (e) {
    console.log('Some error ocurred: ', e)

  } finally {
    if (connection) {

      connection.release();
    }
    process.exit();
  }
}

(async () => {
  await main()
})()