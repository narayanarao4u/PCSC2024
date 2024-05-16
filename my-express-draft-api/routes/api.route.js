const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

//  api/memdata
router.get("/memdata", async (req, res, next) => {
  try {
    let findQ1 = {
      select: {
        MEMID: true,
        Name: true,
        _count: {
          select: {
            cashbook: true,
          },
        },
        cashbook: {
          select: {
            CBID: true,
            Amt: true,
          },
        },
      },

      take: 10,
    };

    let findQ2 = { take: 20 };
    let findQ4 = { where: { Name: "P. SEETA RAMANJANEYULU IPS" } };
    let findQ3 = { select: { Rank: true }, distinct: ["Rank"] };


    const data = await prisma.memdata.findMany(findQ2);

    
    // const data = await prisma.memdata.findFirst({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/memdata", async (req, res, next) => {
  try {
    const data = await prisma.memdata.create({
      data: req.body,
    });
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
