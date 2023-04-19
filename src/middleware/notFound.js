exports.routeNotfound = (req, res) => {
  res.status(404).json({ status: false, message: "Route not found" });
};
exports.createDomain = async (req, res) => {
  try {
    const { domain_name, domain_slug } = req.body;
    // Destructuring domain_name and domain_slug from request body
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json({ success: false, message: bodyCannotBeEmpty });
    }
    // Checking if request body is empty, returning error if true
    if (!isValid(domain_name)) {
      return res
        .status(400)
        .json({ success: false, message: elementCannotBeEmpty("domain_name") });
    }
    // Checking if domain_name is valid, returning error if false
    const domainFound = await Domain.findOne({ domain_name });
    if (domainFound) {
      return res
        .status(400)
        .json({ success: false, message: alreadyExsist("domain_name") });
    }
    // Checking if domain_name already exists, returning error if true
    const domain_owner = await User.findById(req.user._id);
    // Finding domain owner user by id from request user object
    const cloudflareData = JSON.stringify({
      hostname: domain_name,
      ssl: {
        method: "txt",
        type: "dv",
        settings: {
          http2: "on",
          min_tls_version: "1.0",
          tls_1_3: "on",
        },
      },
    });
    // Creating JSON string for cloudflare request data
    const clouflareRes = await axios.post(
      process.env.clouflareRes,
      cloudflareData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Key": process.env.X_Auth_Key,
          "X-Auth-Email": process.env.X_Auth_Email,
        },
      }
    );
    // Sending POST request to cloudflare API, receiving response
    const domainConfig = await axios.get(
      `${process.env.clouflareRes}/${clouflareRes.data.result.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Key": process.env.X_Auth_Key,
          "X-Auth-Email": process.env.X_Auth_Email,
        },
      }
    );
    console.log(domainConfig, "domainConfig");
    // Retrieving cloudflare domain configuration using GET request and domain id

    const metadata = {
      id: clouflareRes.data.result.id,
      status: clouflareRes.data.result.ssl.status,
      records: [
        {
          name: domainConfig.data.result.ssl.txt_name,
          value: domainConfig.data.result.ssl.txt_value,
          type: "txt",
        },
        {
          name: domainConfig.data.result.ownership_verification.name,
          value: domainConfig.data.result.ownership_verification.value,
          type: "txt",
        },
      ],
    };
    // Creating metadata object using cloudflare response data
    const { name, url, timezone } = req.body;

    const domain = await Domain.create({
      domain_name,
      domain_owner,
      domain_slug,
      metadata,
    });

    const user = await User.findById(req.user._id);
    user.domainlist.push(domain);

    await user.save();
    // console.log(user);
    return res
      .status(201)
      .json({
        success: true,
        message: "Domain added successfully",
        id: domain._id,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
