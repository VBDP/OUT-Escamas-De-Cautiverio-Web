Guía de Buenas Prácticas de Trabajo con Git Flow
1. Ramas Principales
Main 🏆

Esta es la rama principal y siempre debe estar listada y estable para producción.

Dev 🔄

Rama de desarrollo donde se realizan todas las integraciones de tareas.

2. Creación de Ramas de Tareas
Comando

Cada vez que comiences una nueva tarea, crea una nueva rama a partir de dev utilizando el siguiente comando:

git checkout -b nombre-de-tu-rama


Esto creará la nueva rama y cambiarás a ella automáticamente.

3. Commit de Cambios
Buenas Prácticas en los Commits

Realiza commits solo cuando la tarea esté terminada.

Si necesitas hacer un commit intermedio, usa un mensaje claro como:

Trabajo en progreso: No terminado

Mensajes Descriptivos

Asegúrate de que los mensajes de los commits sean claros y detallados:

Incorrecto:

Arreglado un bug


Correcto:

Reparado el funcionamiento de la función SumaCaracoles

Selección de Archivos

Nunca uses git add . sin antes revisar qué archivos has tocado. Añade solo los archivos que modificaste:

git add carpeta/MeGustaProgramar.cs

4. Resolución de Conflictos
Trabajo en Equipo

Si tienes conflictos de código con algún compañero, comunica con él para decidir cómo se resolverá el conflicto, nunca elimines su trabajo.

5. Pull Requests e Integración
Revisión de Código

Antes de fusionar tu rama con dev, realiza un Pull Request para revisión. Esto asegura que el código sea revisado y aprobado por un compañero antes de ser integrado.

¡Recuerda! Git Flow es una herramienta poderosa para mantener el código organizado y garantizar un flujo de trabajo eficiente y colaborativo.

GitFlow:
  ├── main (Producción)
  │     ▲
  │     │
  │     ├── release/*  ←── QA / pruebas finales
  │     │       ▲
  │     │       │
  │     │       └── dev (Integración)
  │     │              ▲
  │     │              │
  │     │              ├── feature/*  ←── Desarrollo de tareas
  │     │              │       ├── feature/login-system
  │     │              │       ├── feature/add-report-export
  │     │              │       └── feature/update-user-profile
  │     │              │
  │     │              └── hotfix/* (parches urgentes)
  │     │                      └── se fusionan a main y dev
  │     │
  │     └── Tag de versión (v1.0.0)
  │
  └── Ciclo:
        - Los desarrollos parten de dev
        - Se integran mediante pull requests
        - Release se usa para preparar versiones
        - Main recibe solo código estable y probado

